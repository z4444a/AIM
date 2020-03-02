package ru.relex.aim.service.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import ru.relex.aim.repository.entity.RequestParameterValue;
import ru.relex.aim.repository.entity.PoolParameterValue;
import ru.relex.aim.service.model.get.ParamValueShortVer;

import java.util.Set;

/**
 * Maps between {@link RequestParameterValue} and it's DTOs.
 *
 * @author Nastya Zinchenko
 */
@Mapper
public interface IParamValueShortVerMapper {

  /**
   * Converts {@link RequestParameterValue} to {@link ParamValueShortVer}.
   *
   * @param entity entity to convert
   */
  @Mapping(target = "name", source = "entity.parameter.name")
  @Mapping(target = "content", expression = "java(entity.getValueAsString())")
  @Mapping(target = "modifier", source = "entity.parameter.modifier")
  ParamValueShortVer toGetDto(RequestParameterValue entity);

  /**
   * Converts {@link RequestParameterValue} to {@link ParamValueShortVer}.
   *
   * @param entity entity to convert
   */
  @Mapping(target = "name", source = "entity.parameter.name")
  @Mapping(target = "content", expression = "java(entity.getValueAsString())")
  @Mapping(target = "modifier", source = "entity.parameter.modifier")
  ParamValueShortVer toGetDto(PoolParameterValue entity);

  /**
   * Converts a set of {@link RequestParameterValue}
   * to a set of {@link ParamValueShortVer}.
   *
   * @param entities entities to convert
   */
  Set<ParamValueShortVer> toGetDto(Set<RequestParameterValue> entities);
}
