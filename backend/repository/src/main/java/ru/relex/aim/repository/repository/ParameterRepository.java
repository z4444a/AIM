package ru.relex.aim.repository.repository;

import ru.relex.aim.commons.EntityType;
import ru.relex.aim.commons.modifier.ParameterModifier;
import ru.relex.aim.repository.entity.Parameter;
import ru.relex.aim.repository.repository.base.BaseRepository;
import ru.relex.aim.repository.repository.base.EntityTypedRepository;

import java.util.List;

/**
 * Manages {@link Parameter}.
 *
 * @author Alexey Alimov
 */
public interface ParameterRepository extends BaseRepository<Parameter, Integer>,
    EntityTypedRepository<Parameter, Integer> {

  @Override
  default EntityType getEntityType() {
    return EntityType.PARAMETER;
  }

  /**
   * Retrieves a List of instances
   * by the given resource type identifier.
   *
   * @param resourceTypeId resource type id by which to find.
   * @return a list of instances if any found. Empty list otherwise.
   */
  List<Parameter> findByResourceTypeId(Integer resourceTypeId);

  /**
   * Returns a parameter with the given modifier and identifier stored in the database.
   */
  Parameter findByIdentifierAndModifier(String identifier, ParameterModifier modifier);
}
