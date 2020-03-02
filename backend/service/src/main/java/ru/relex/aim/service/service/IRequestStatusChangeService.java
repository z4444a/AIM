package ru.relex.aim.service.service;

import ru.relex.aim.repository.entity.RequestStatus;
import ru.relex.aim.repository.entity.RequestStatusChange;
import ru.relex.aim.service.model.get.RequestStatusChangeGetDto;

import javax.validation.constraints.NotNull;
import java.util.List;

/**
 * Manages {@link ru.relex.aim.repository.entity.RequestStatus}
 * and {@link ru.relex.aim.repository.entity.RequestStatusChange}.
 */
public interface IRequestStatusChangeService {

  /**
   * Adds a status change to the request status history stored in the database.
   *
   * @param requestId identifier of the request whose status had been changed.
   * @param status    new request status.
   */
  void addHistoryRecord(@NotNull Integer requestId, RequestStatus status);

  /**
   * Returns a list of status change filtered by request.
   *
   * @param requestId request identifier.
   */
  List<RequestStatusChangeGetDto> getHistory(@NotNull Integer requestId);
}
