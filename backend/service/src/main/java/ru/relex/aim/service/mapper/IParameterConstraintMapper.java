package ru.relex.aim.service.mapper;

import java.util.List;
import org.mapstruct.InjectionStrategy;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import ru.relex.aim.repository.entity.ListValue;
import ru.relex.aim.repository.entity.Parameter;
import ru.relex.aim.repository.entity.ParameterConstraint;
import ru.relex.aim.service.model.create.ParameterConstraintCreateDto;
import ru.relex.aim.service.model.get.ParameterConstraintGetDto;
import ru.relex.aim.service.model.update.ParameterConstraintUpdateDto;


/**
 * Maps between {@link ParameterConstraint} and it's DTOs.
 *
 * @author Dmitriy Poshevelya
 */
@Mapper(uses = IListValueMapper.class, injectionStrategy = InjectionStrategy.CONSTRUCTOR)
public abstract class IParameterConstraintMapper {

  /**
   * Converts {@link ParameterConstraint} to {@link ParameterConstraintGetDto}.
   *
   * @param entity entity to convert
   */
  @Mapping(target = "listValues", source = "listValues")
  public abstract ParameterConstraintGetDto toGetDto(ParameterConstraint entity, List<ListValue> listValues);

  /**
   * Converts {@link Parameter} to {@link ParameterConstraintGetDto}.
   *
   * @param parameter entity to convert
   */
  public ParameterConstraintGetDto toGetDto(Parameter parameter) {
    return toGetDto(parameter.getConstraint(), parameter.getListValues());
  }

  /**
   * Converts {@link ParameterConstraintCreateDto} to {@link ParameterConstraint}.
   *
   * @param dto entity to convert
   */
  @Mapping(target = "id", ignore = true)
  @Mapping(target = "parameter", ignore = true)
  public abstract ParameterConstraint fromCreateDto(ParameterConstraintCreateDto dto);

  /**
   * Converts {@link ParameterConstraintUpdateDto} to {@link ParameterConstraint}.
   *
   * @param dto entity to convert
   */
  @Mapping(target = "parameter", ignore = true)
  public abstract ParameterConstraint fromUpdateDto(ParameterConstraintUpdateDto dto);
}
