package ru.relex.aim.repository.repository;

import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import ru.relex.aim.commons.EntityType;
import ru.relex.aim.repository.entity.RequestParameterValue;
import ru.relex.aim.repository.repository.base.BaseRepository;
import ru.relex.aim.repository.repository.base.EntityTypedRepository;

import java.util.List;

/**
 * Manages {@link RequestParameterValue}.
 */
public interface ParameterValueRepository extends BaseRepository<RequestParameterValue, Integer>,
    JpaSpecificationExecutor<RequestParameterValue>, EntityTypedRepository<RequestParameterValue, Integer> {

  @Override
  default EntityType getEntityType() {
    return EntityType.REQUEST_PARAMETER_VALUE;
  }

  /**
   * Retrieves a List of instances
   * by given request identifier.
   *
   * @return a list of instances if any found. Empty list otherwise.
   */
  List<RequestParameterValue> findAllByRequestId(Integer id);

  /**
   * Returns true if the parameter field has been filled and a value is stored in the database.
   */
  boolean existsByParameterId(Integer id);
}
