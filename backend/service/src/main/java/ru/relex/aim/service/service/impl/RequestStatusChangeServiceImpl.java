package ru.relex.aim.service.service.impl;

import org.springframework.stereotype.Service;
import ru.relex.aim.repository.entity.RequestStatus;
import ru.relex.aim.repository.repository.RequestStatusChangeRepository;
import ru.relex.aim.security.model.AuthUser;
import ru.relex.aim.service.mapper.IRequestStatusChangeMapper;
import ru.relex.aim.service.model.get.RequestStatusChangeGetDto;
import ru.relex.aim.service.service.IRequestStatusChangeService;

import javax.validation.constraints.NotNull;
import java.util.List;

/**
 * Manages {@link ru.relex.aim.repository.entity.RequestStatusChange}.
 */
@Service
public class RequestStatusChangeServiceImpl implements IRequestStatusChangeService {

  private final RequestStatusChangeRepository changeRepository;
  private final AuthUser authUser;
  private final IRequestStatusChangeMapper changeMapper;

  /**
   * Constructor.
   */
  public RequestStatusChangeServiceImpl(RequestStatusChangeRepository changeRepository,
                                        AuthUser authUser,
                                        IRequestStatusChangeMapper changeMapper) {
    this.changeRepository = changeRepository;
    this.authUser = authUser;
    this.changeMapper = changeMapper;
  }

  /**
   * {@inheritDoc}
   */
  @Override
  public void addHistoryRecord(@NotNull Integer requestId, RequestStatus status) {
    changeRepository.save(changeMapper.constructEntity(requestId, status, authUser.getId()));
  }

  /**
   * {@inheritDoc}
   */
  @Override
  public List<RequestStatusChangeGetDto> getHistory(@NotNull Integer requestId) {
    return changeMapper.toGetDto(changeRepository.findAllByRequestIdOrderById(requestId));
  }
}
