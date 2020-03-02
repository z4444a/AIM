package ru.relex.aim.service.mapper;

import org.mapstruct.Mapper;
import ru.relex.aim.repository.entity.ParameterType;
import ru.relex.aim.service.model.base.ParameterTypeDto;

/**
 * Maps between {@link ParameterType} and it's DTOs.
 *
 * @author Alexey Alimov
 */
@Mapper
public class ParameterTypeMapper {

  /**
   * Converts {@link ParameterType} to {@link ParameterTypeDto}.
   *
   * @param entity entity to convert
   */
  public ParameterTypeDto toDto(ParameterType entity) {
    final int id = entity.getId();
    return ParameterTypeDto.fromId(id);
  }
}
