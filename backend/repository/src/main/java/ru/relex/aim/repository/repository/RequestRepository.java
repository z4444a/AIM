package ru.relex.aim.repository.repository;

import ru.relex.aim.commons.EntityType;
import ru.relex.aim.repository.entity.Request;
import ru.relex.aim.repository.entity.RequestStatus;
import ru.relex.aim.repository.entity.ResourcePool;
import ru.relex.aim.repository.repository.base.BaseRepository;
import ru.relex.aim.repository.repository.base.EntityTypedRepository;

import java.util.List;

/**
 * Manages {@link Request}.
 *
 * @author Alexey Alimov
 */
public interface RequestRepository extends BaseRepository<Request, Integer>,
    EntityTypedRepository<Request, Integer> {

  @Override
  default EntityType getEntityType() {
    return EntityType.REQUEST;
  }

  /**
   * Finds all requests entities by pool.
   */
  List<Request> findByPool(ResourcePool pool);

  /**
   * Counts the number of  requests have status and type determined by identifier.
   *
   * @param typeId is resource type identifier.
   * @param status is request status.
   * @return count of requests.
   */
  Integer countAllByTypeIdAndStatus(Integer typeId, RequestStatus status);
}
