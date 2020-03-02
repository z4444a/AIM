package ru.relex.aim.service.mapper;

import org.mapstruct.InjectionStrategy;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import ru.relex.aim.repository.entity.Parameter;
import ru.relex.aim.service.model.create.ParameterCreateDto;
import ru.relex.aim.service.model.get.ParameterGetDto;
import ru.relex.aim.service.model.update.ParameterUpdateDto;

import java.util.List;

/**
 * Maps between {@link Parameter} and it's DTOs.
 *
 * @author Alexey Alimov
 */
@Mapper(uses = {
    IParameterTypeMapper.class,
    IParameterConstraintMapper.class,
    IListValueMapper.class
    }, injectionStrategy = InjectionStrategy.CONSTRUCTOR)
public interface IParameterMapper {
  String IDENTIFIER = "identifier";
  /**
   * Converts {@link Parameter} to {@link ParameterGetDto}.
   *
   * @param entity entity to convert
   */
  @Mapping(target = "constraint", source = "entity")
  ParameterGetDto toGetDto(Parameter entity);

  /**
   * Converts a list of {@link Parameter}
   * to a list of {@link ParameterGetDto}.
   *
   * @param entities entities to convert
   */
  List<ParameterGetDto> toGetDto(List<Parameter> entities);

  /**
   * Converts a {@link ParameterCreateDto}
   * to a  {@link Parameter}.
   *
   * @param dto entities to convert
   */
  @Mapping(target = "id", ignore = true)
  @Mapping(target = "resourceType", ignore = true)
  @Mapping(target = "constraint.id", ignore = true)
  @Mapping(target = "constraint.parameter", ignore = true)
  @Mapping(target = "listValues", source = "constraint.listValues")
  @Mapping(target = IDENTIFIER, source = IDENTIFIER, qualifiedByName = "mapIdentifier")
  Parameter fromCreateDto(ParameterCreateDto dto);

  /**
   * Converts a {@link ParameterUpdateDto}
   * to a  {@link Parameter}.
   *
   * @param dto entities to convert
   */
  @Mapping(target = "resourceType", ignore = true)
  @Mapping(target = "listValues", source = "constraint.listValues")
  @Mapping(target = "constraint.parameter", ignore = true)
  @Mapping(target = IDENTIFIER, source = IDENTIFIER, qualifiedByName = "mapIdentifier")
  Parameter fromUpdateDto(ParameterUpdateDto dto);

  /**
   * Replaces empty identifier with null.
   * @param identifier parameter identifier specified by user.
   * @return identifier after null-check.
   */
  @Named("mapIdentifier")
  default String mapIdentifier(String identifier) {
    return identifier == null || identifier.isBlank() ? null : identifier;
  }
}
