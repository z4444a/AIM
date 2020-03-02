package ru.relex.aim.repository.repository;

import ru.relex.aim.commons.EntityType;
import ru.relex.aim.repository.entity.ParameterConstraint;
import ru.relex.aim.repository.repository.base.BaseRepository;
import ru.relex.aim.repository.repository.base.EntityTypedRepository;

/**
 * Repository to manage {@link ru.relex.aim.repository.entity.ParameterConstraint}.
 *
 * @author Dmitriy Poshevelya
 */
public interface ParameterConstraintRepository
    extends BaseRepository<ParameterConstraint, Integer>, EntityTypedRepository<ParameterConstraint, Integer> {

  @Override
  default EntityType getEntityType() {
    return EntityType.PARAMETER_CONSTRAINT;
  }
}
