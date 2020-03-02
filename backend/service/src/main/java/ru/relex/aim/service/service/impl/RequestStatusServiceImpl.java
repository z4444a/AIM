package ru.relex.aim.service.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.annotation.Validated;
import ru.relex.aim.commons.EntityType;
import ru.relex.aim.commons.Role;
import ru.relex.aim.commons.TemplateType;
import ru.relex.aim.repository.entity.Request;
import ru.relex.aim.repository.entity.RequestState;
import ru.relex.aim.repository.entity.RequestStatus;
import ru.relex.aim.repository.entity.ResourcePool;
import ru.relex.aim.repository.repository.ParameterValueRepository;
import ru.relex.aim.repository.repository.RequestRepository;
import ru.relex.aim.repository.repository.ResourcePoolRepository;
import ru.relex.aim.security.model.AuthUser;
import ru.relex.aim.service.mapper.ICommentMapper;
import ru.relex.aim.service.mapper.INamedEntityMapper;
import ru.relex.aim.service.mapper.RequestParameterValueMapper;
import ru.relex.aim.service.model.RequestAcceptDto;
import ru.relex.aim.service.model.base.NamedDto;
import ru.relex.aim.service.model.create.CommentCreateDto;
import ru.relex.aim.service.model.create.RequestParameterValueCreateDto;
import ru.relex.aim.service.model.get.CommentGetDto;
import ru.relex.aim.service.service.IRequestStatusService;
import ru.relex.aim.service.service.ICommentService;
import ru.relex.aim.service.service.INotificationService;
import ru.relex.aim.service.service.IRequestStatusChangeService;
import ru.relex.aim.service.validation.annotation.EntityExists;


/**
 * Manages {@link ru.relex.aim.repository.entity.RequestStatus}.
 *
 * @author Sorokin Georgy
 */
@Validated
@Service
public class RequestStatusServiceImpl implements IRequestStatusService {

  private final Set<RequestStatus> closableStatuses = Set.of(RequestStatus.IN_PROGRESS, RequestStatus.PAUSED);

  private final RequestRepository requestRepository;
  private final AuthUser authUser;
  private final ICommentService commentService;
  private final ICommentMapper commentMapper;
  private final RequestParameterValueMapper valueMapper;
  private final ParameterValueRepository valueRepository;
  private final INotificationService notificationService;
  private final ResourcePoolRepository poolRepository;
  private final INamedEntityMapper namedEntityMapper;
  private final IRequestStatusChangeService changeService;

  /**
   * Constructor.
   */
  public RequestStatusServiceImpl(RequestRepository requestRepository,
                                  AuthUser authUser,
                                  ICommentService commentService,
                                  ICommentMapper commentMapper,
                                  RequestParameterValueMapper valueMapper,
                                  ParameterValueRepository valueRepository,
                                  INotificationService notificationService,
                                  INamedEntityMapper namedEntityMapper,
                                  ResourcePoolRepository poolRepository,
                                  IRequestStatusChangeService changeService) {
    this.requestRepository = requestRepository;
    this.authUser = authUser;
    this.commentService = commentService;
    this.commentMapper = commentMapper;
    this.valueMapper = valueMapper;
    this.valueRepository = valueRepository;
    this.notificationService = notificationService;
    this.poolRepository = poolRepository;
    this.namedEntityMapper = namedEntityMapper;
    this.changeService = changeService;
  }

  @Override
  @Transactional
  public boolean accept(RequestAcceptDto dto) {
    final var request = acceptRequest(dto);
    if (request == null) {
      return false;
    }
    changeService.addHistoryRecord(request.getId(), request.getStatus());
    final var values = dto.getAllocationValues();
    saveAllocationValues(request, values);
    if (dto.getComment() != null && !dto.getComment().isBlank()) { // do not create empty comments
      saveComment(dto);
    }
    final Map<String, Object> parameters = new HashMap<>();
    parameters.put("idRequest", request.getId());
    parameters.put("type", request.getType().getName());
    parameters.put("comment", dto.getComment());
    notificationService.notify(request.getAuthor().getUsername(), TemplateType.APPROVE_REQUEST, parameters);
    return true;
  }

  @Override
  @Transactional
  public CommentGetDto rejectAndComment(CommentCreateDto createDto) {
    var request = requestRepository.getOne(createDto.getRequestId());
    request.setStatus(RequestStatus.CANCELED);
    request = requestRepository.saveAndRefresh(request);
    changeService.addHistoryRecord(request.getId(), request.getStatus());
    final Map<String, Object> parameters = new HashMap<>();
    parameters.put("idRequest", request.getId());
    parameters.put("type", request.getType().getName());
    parameters.put("comment", createDto.getContent());
    notificationService.notify(request.getAuthor().getUsername(), TemplateType.REJECT_REQUEST, parameters);
    return commentService.create(createDto);
  }

  /**
   * {@inheritDoc}
   */
  @Override
  public void close(@EntityExists(entityType = EntityType.REQUEST) Integer requestId) {
    var request = requestRepository.findById(requestId).orElseThrow();
    if (!closableStatuses.contains(request.getStatus())) {
      return;
    }
    request.setStatus(RequestStatus.EXECUTED);
    request.setState(RequestState.INACTIVE);
    request = requestRepository.saveAndRefresh(request);
    changeService.addHistoryRecord(request.getId(), request.getStatus());
    final var pool = request.getPool();
    if (pool == null) {
      return;
    }
    pool.setCurrentCapacity(pool.getCurrentCapacity() + request.getAmount());
    poolRepository.save(pool);
    notifyOfStatusChange(request);
  }

  /**
   * {@inheritDoc}
   */
  @Override
  public void pause(@EntityExists(entityType = EntityType.REQUEST) Integer requestId) {
    var request = requestRepository.findById(requestId).orElseThrow();
    if (request.getStatus() != RequestStatus.IN_PROGRESS) {
      return;
    }
    request.setStatus(RequestStatus.PAUSED);
    request.setState(RequestState.INACTIVE);
    request = requestRepository.saveAndRefresh(request);
    changeService.addHistoryRecord(request.getId(), request.getStatus());
    notifyOfStatusChange(request);
  }

  /**
   * {@inheritDoc}
   */
  @Override
  public void resume(@EntityExists(entityType = EntityType.REQUEST) Integer requestId) {
    var request = requestRepository.findById(requestId).orElseThrow();
    if (request.getStatus() != RequestStatus.PAUSED) {
      return;
    }
    request.setStatus(RequestStatus.IN_PROGRESS);
    request = requestRepository.saveAndRefresh(request);
    changeService.addHistoryRecord(request.getId(), request.getStatus());
    notifyOfStatusChange(request);
  }

  @Override
  @Transactional
  public List<NamedDto> getPoolSuggestions(Integer requestId) {
    final var request = requestRepository.getOne(requestId);
    final var type = request.getType();
    final int typeId = type.getId();
    final boolean capacityCheck = type.getQuantitative();
    final var capacity = request.getAmount();
    final boolean userCheck = authUser.getRole() != Role.ADMIN;
    final int userId = authUser.getId();
    final var list = poolRepository.getSuggestions(typeId, capacityCheck, capacity, userCheck, userId);
    return namedEntityMapper.toNamedDto(list);
  }

  private void saveAllocationValues(Request request, List<RequestParameterValueCreateDto> values) {
    final var allocationValues = values.stream()
        .map(valueMapper::fromCreateDto)
        .peek(paramValue -> paramValue.setRequest(request))
        .collect(Collectors.toSet());
    valueRepository.saveAll(allocationValues);
  }

  private void saveComment(RequestAcceptDto dto) {
    final var comment = commentMapper.toCreateDto(dto, authUser.getId());
    commentService.create(comment);
  }

  private Request acceptRequest(RequestAcceptDto dto) {
    final var request = requestRepository.getOne(dto.getId());
    final var type = request.getType();
    final var pool = poolRepository.getOne(dto.getPoolId());
    final var validCapacity = !type.getQuantitative() || hasEnoughCapacity(pool, request.getAmount());
    if (!hasRightType(pool, type.getId()) || !validCapacity) {
      return null;
    }
    pool.setCurrentCapacity(pool.getCurrentCapacity() - request.getAmount());
    request.setPool(pool);
    request.setOwner(pool.getOwners().iterator().next());
    request.setStatus(RequestStatus.IN_PROGRESS);
    return requestRepository.saveAndRefresh(request);
  }

  private boolean hasRightType(ResourcePool resourcePool, Integer typeId) {
    return resourcePool.getResourceType().getId().equals(typeId);
  }

  private boolean hasEnoughCapacity(ResourcePool resourcePool, Integer capacity) {
    return resourcePool.getCurrentCapacity() >= capacity;
  }

  private void notifyOfStatusChange(Request request) {
    final Map<String, Object> parameters = new HashMap<>();
    parameters.put("idRequest", request.getId());
    parameters.put("type", request.getType().getName());
    parameters.put("status", request.getStatus().getName());
    notificationService.notify(request.getAuthor().getUsername(), TemplateType.CHANGE_STATUS, parameters);
  }
}
