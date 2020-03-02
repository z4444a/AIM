package ru.relex.aim.repository.repository;

import ru.relex.aim.commons.EntityType;
import ru.relex.aim.repository.entity.PoolParameterValue;
import ru.relex.aim.repository.repository.base.BaseRepository;
import ru.relex.aim.repository.repository.base.EntityTypedRepository;

/**
 * Manages {@link PoolParameterValue}.
 *
 * @author Nastya Zinchenko
 */
public interface PoolParameterValueRepository extends BaseRepository<PoolParameterValue, Integer>,
                                                          EntityTypedRepository<PoolParameterValue, Integer> {

  @Override
  default EntityType getEntityType() {
    return EntityType.POOL_PARAMETER_VALUE;
  }

  /**
   * Returns true if the parameter field has been filled and a value is stored in the database.
   */
  boolean existsByParameterId(Integer id);
}
