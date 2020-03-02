package ru.relex.aim.service.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import ru.relex.aim.repository.entity.GeneralParameterValue;
import ru.relex.aim.repository.entity.Parameter;

/**
 * Maps to {@link GeneralParameterValue}.
 *
 * @author Nastya Zinchenko
 */
@Mapper
public interface IGeneralParameterValueMapper {

  /**
   * Converts  {@link Parameter} and value
   *    * to {@link GeneralParameterValue}.
   */
  @Mapping(target = "id", source = "param.id")
  @Mapping(target = "value", source = "value")
  @Mapping(target = "parameterType", source = "param.parameterType.id")
  GeneralParameterValue toGeneralParameterValue(Parameter param, Object value);
}
