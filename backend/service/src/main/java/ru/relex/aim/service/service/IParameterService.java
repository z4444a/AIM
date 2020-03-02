package ru.relex.aim.service.service;

import ru.relex.aim.commons.EntityType;
import ru.relex.aim.commons.modifier.ParameterModifier;
import ru.relex.aim.service.filter.ParameterFilterParam;
import ru.relex.aim.service.model.create.ParameterCreateDto;
import ru.relex.aim.service.model.get.ParameterGetDto;
import ru.relex.aim.service.validation.annotation.EntityExists;
import ru.relex.aim.service.validation.annotation.ParameterIdentifierSyntax;

import javax.validation.Valid;
import java.util.List;
import java.util.Map;

/**
 * Manages {@link ru.relex.aim.repository.entity.ResourceType}.
 *
 * @author Alexey Alimov
 */
public interface IParameterService {

  /**
   * Returns a list of DTOs of {@link ru.relex.aim.repository.entity.Parameter}
   * witt applied filter.
   *
   * @return List of DTOs if any found. Empty list otherwise.
   */
  List<ParameterGetDto> getAll(Map<ParameterFilterParam, Object> filter);

  /**
   * Creates an instance in database with information provided in DTO.
   *
   * @param parameterCreateDto DTO that holds information about entity to save. Must not be null.
   * @return saved entity.
   */
  ParameterGetDto create(@Valid ParameterCreateDto parameterCreateDto);

  /**
   * Returns true if the parameter field has been filled and a value is stored in the database.
   */
  Boolean isUsed(@EntityExists(entityType = EntityType.PARAMETER) Integer id);

  /**
   * Checks whether given identifier is already assigned to parameter in the given parameter group/with modifier.
   *
   * @param identifier field of parameter to check
   * @param modifier   modifier of the parameters group.
   * @param id         Id of the parameter which identifier should be ignored. Presence of this parameter designates
   *                   whether identifier check pefrormed during parameter creation or parameter edit.
   * @return {@code true} if identifier is already in use by a different parameter with the same modifier.
   */

  Boolean isIdentifierUsed(@ParameterIdentifierSyntax String identifier, ParameterModifier modifier, Integer id);
}
