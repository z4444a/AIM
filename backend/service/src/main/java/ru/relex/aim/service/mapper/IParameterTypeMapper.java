package ru.relex.aim.service.mapper;

import org.mapstruct.Mapper;
import ru.relex.aim.repository.entity.ParameterType;
import ru.relex.aim.service.model.base.ParameterTypeDto;


/**
 * Maps between {@link ru.relex.aim.repository.entity.ParameterType} and it's DTOs.
 *
 * @author Dmitriy Poshevelya
 */
@Mapper
public class IParameterTypeMapper {
  /**
   * Converts  {@link ParameterType}
   * to {@link ParameterTypeDto}.
   *
   * @param entity entities to convert
   */
  public ParameterTypeDto toGetDto(ParameterType entity) {
    return ParameterTypeDto.fromId(entity.getId());
  }

  /**
   * Converts  {@link ParameterTypeDto}
   * to {@link Integer}.
   *
   * @param parameterTypeDto entities to convert
   */
  public Integer toCreateDto(ParameterTypeDto parameterTypeDto) {
    return parameterTypeDto.getId();
  }
}
