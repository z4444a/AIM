package ru.relex.aim.repository.repository;

import ru.relex.aim.repository.entity.RequestStatusChange;
import ru.relex.aim.repository.repository.base.BaseRepository;

import java.util.List;

/**
 * Repository to manage {@link RequestStatusChange}.
 */
public interface RequestStatusChangeRepository extends BaseRepository<RequestStatusChange, Integer> {
  /**
   * Finds instances of {@link RequestStatusChange} by request identifier.
   *
   * @param requestId request identifier
   * @return a list of instances
   */
  List<RequestStatusChange> findAllByRequestIdOrderById(Integer requestId);

  /**
   * Finds the last history record by request id.
   */
  RequestStatusChange findFirstByRequestIdOrderByIdDesc(Integer requestId);
}
