package ru.relex.aim.service.service.impl;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.annotation.Validated;
import ru.relex.aim.commons.EntityType;
import ru.relex.aim.commons.Role;
import ru.relex.aim.commons.TemplateType;
import ru.relex.aim.repository.entity.GeneralParameterValue;
import ru.relex.aim.repository.entity.Request;
import ru.relex.aim.repository.entity.RequestState;
import ru.relex.aim.repository.entity.RequestStatus;
import ru.relex.aim.repository.repository.ParameterRepository;
import ru.relex.aim.repository.repository.ParameterValueRepository;
import ru.relex.aim.repository.repository.RequestRepository;
import ru.relex.aim.repository.repository.ResourcePoolRepository;
import ru.relex.aim.repository.specification.order.RequestOrderSpecs;
import ru.relex.aim.security.model.AuthUser;
import ru.relex.aim.service.filter.RequestFilterParam;
import ru.relex.aim.service.mapper.IGeneralParameterValueMapper;
import ru.relex.aim.service.mapper.IRequestMapper;
import ru.relex.aim.service.model.base.PageModel;
import ru.relex.aim.service.model.create.RequestCreateDto;
import ru.relex.aim.service.model.get.RequestGetDto;
import ru.relex.aim.service.model.get.RequestGetDtoWithComments;
import ru.relex.aim.service.model.update.RequestUpdateDto;
import ru.relex.aim.service.service.INotificationService;
import ru.relex.aim.service.service.IRequestService;
import ru.relex.aim.service.service.IRequestStatusChangeService;
import ru.relex.aim.service.sort.RequestSort;
import ru.relex.aim.service.sort.SortingOrder;
import ru.relex.aim.service.validation.annotation.EntityExists;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.time.format.FormatStyle;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.stream.Collectors;

import static ru.relex.aim.service.validation.code.ConstraintCode.ENTITY_EXISTS;
import static ru.relex.aim.service.validation.code.ParameterCode.REQUEST;

/**
 * Manages {@link ru.relex.aim.repository.entity.Request}.
 *
 * @author Alexey Alimov
 */
@Validated
@Service
public class RequestServiceImpl implements IRequestService {

  private final RequestRepository requestRepository;
  private final ParameterValueRepository paramValueRepository;
  private final ParameterRepository parameterRepository;
  private final IRequestMapper mapper;
  private final AuthUser authUser;
  private final ResourcePoolRepository poolRepository;
  private final INotificationService notificationService;
  private final IGeneralParameterValueMapper genParamValueMapper;
  private final IRequestStatusChangeService changeService;

  /**
   * Constructor.
   */
  public RequestServiceImpl(RequestRepository requestRepository,
                            IRequestMapper mapper,
                            ParameterValueRepository paramValueRepository,
                            AuthUser authUser,
                            ResourcePoolRepository poolRepository,
                            INotificationService notificationService,
                            ParameterRepository parameterRepository,
                            IGeneralParameterValueMapper genParamValueMapper,
                            IRequestStatusChangeService changeService) {
    this.requestRepository = requestRepository;
    this.paramValueRepository = paramValueRepository;
    this.mapper = mapper;
    this.authUser = authUser;
    this.poolRepository = poolRepository;
    this.notificationService = notificationService;
    this.parameterRepository = parameterRepository;
    this.genParamValueMapper = genParamValueMapper;
    this.changeService = changeService;
  }

  /**
   * {@inheritDoc}
   */
  @Override
  @Transactional
  public PageModel<RequestGetDto> getAll(Integer typeId, String description, Integer statusId,
                                         Map<String, Object> params, RequestSort sortBy,
                                         @NotNull SortingOrder order, int page, int pageSize) {

    final var filterMap = RequestFilterParam.buildParamMap(typeId, description, statusId, parametersMapToList(params));

    Page<Request> requestPage;

    var spec = filterMap
        .entrySet()
        .stream()
        .map(x -> x.getKey().makeSpec(x.getValue()))
        .reduce(Specification::and)
        .orElse(null);
    if (authUser.getRole() != Role.ADMIN) {
      final Specification<Request> poolOwnerSpec = poolRepository.getResourcePoolByOwnerId(authUser.getId())
          .stream()
          .map(resourcePool -> resourcePool.getResourceType().getId())
          .collect(Collectors.toSet())
          .stream()
          .map(RequestFilterParam.TYPE_ID::makeSpec)
          .reduce(Specification::or)
          .orElse(null);

      final var authorSpec = RequestFilterParam.AUTHOR_ID.makeSpec(authUser.getId());
      spec = authorSpec.or(poolOwnerSpec).and(spec);
    }
    if (sortBy == null) {
      spec = RequestOrderSpecs.defaultOrder().and(spec);
      requestPage = getPage(page, pageSize, spec);
    } else {
      final Sort sort = sortBy.getSort(order.getDirection())
          .and(RequestSort.CREATION.getSort(order.getDirection()));
      requestPage = getPage(page, pageSize, spec, sort);
    }

    final List<RequestGetDto> getDto = mapper.toGetDto(requestPage.getContent());
    return new PageModel<>(getDto, requestPage.getTotalElements(), page);
  }

  private List<GeneralParameterValue> parametersMapToList(Map<String, Object> params) {
    return params.entrySet().stream().map(item -> {
      final var param = parameterRepository.findById(Integer.parseInt(item.getKey())).orElse(null);
      return genParamValueMapper.toGeneralParameterValue(param, item.getValue());
    }).collect(Collectors.toList());
  }

  /**
   * Returns a DTO of {@link ru.relex.aim.repository.entity.Request}
   * by the given identifier.
   *
   * @param id identifier by which to find. May never be null.
   * @return DTO if found. Null otherwise.
   */
  @Override
  @Transactional
  public RequestGetDtoWithComments get(int id) {
    final Request request = requestRepository.findById(id).orElse(null);
    return mapper.toGetDtoWithComments(request);
  }

  /**
   * Creates an instance in database with information provided in DTO.
   *
   * @param createDto DTO that holds information about entity to save. May never be null.
   * @return saved entity identifier.
   */
  @Override
  @Transactional
  public Integer create(@NotNull @Valid RequestCreateDto createDto) {
    createDto.setCreatedById(authUser.getId());
    final Request request = mapper.fromCreateDto(createDto);
    request.setStatus(RequestStatus.NEW);
    request.setState(RequestState.ACTIVE);
    // TODO Need to implement the ability to set a backup flag
    request.setNeedsBackup(false);

    var parameterValues = request.getRequestParameterValues();
    final var savedRequest = requestRepository.saveAndRefresh(request);
    changeService.addHistoryRecord(savedRequest.getId(), savedRequest.getStatus());
    if (parameterValues != null && !parameterValues.isEmpty()) {
      parameterValues = parameterValues.stream()
          .peek(paramValue -> paramValue.setRequest(savedRequest))
          .collect(Collectors.toSet());
    }
    paramValueRepository.saveAll(parameterValues);

    final Map<String, Object> values = new HashMap<>();
    values.put("idRequest", savedRequest.getId());
    values.put("type", savedRequest.getType().getName());
    final DateTimeFormatter formatter =
        DateTimeFormatter.ofLocalizedDateTime(FormatStyle.SHORT)
            .withLocale(new Locale("ru"))
            .withZone(ZoneId.systemDefault());
    values.put("date", formatter.format(savedRequest.getCreation()));
    notificationService.notify(authUser.getUsername(), TemplateType.CREATE_REQUEST, values);
    final var type = savedRequest.getType();
    poolRepository.getPoolOwnersEmailsToNotify(type.getId(), type.getQuantitative(), savedRequest.getAmount())
        .forEach(email -> notificationService.notify(email, TemplateType.FOR_POOLS_OWNERS_ABOUT_REQUEST, values));
    return savedRequest.getId();
  }

  /**
   * Updates already existing entity with information provided in DTO.
   *
   * @param id        identifier of entity to update. May never be null.
   * @param updateDto DTO that holds information about entity to update. May never be null.
   * @return updated entity.
   */
  @Override
  public RequestGetDto update(@EntityExists(message = ENTITY_EXISTS + REQUEST,
      entityType = EntityType.REQUEST) int id,
                              @Valid RequestUpdateDto updateDto) {
    Request request = mapper.fromUpdateDto(updateDto);
    request.setId(id);
    request = requestRepository.saveAndRefresh(request);
    return mapper.toGetDto(request);
  }

  private Page<Request> getPage(int page, int pageSize, Specification<Request> spec, Sort sort) {
    final PageRequest pageRequest = PageRequest.of(page, pageSize, sort);

    return requestRepository.findAll(spec, pageRequest);
  }

  private Page<Request> getPage(int page, int pageSize, Specification<Request> spec) {
    final PageRequest pageRequest = PageRequest.of(page, pageSize);

    return requestRepository.findAll(spec, pageRequest);
  }
}
