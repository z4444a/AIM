package ru.relex.aim.service.mapper;

import org.mapstruct.InjectionStrategy;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import ru.relex.aim.repository.entity.RequestParameterValue;
import ru.relex.aim.service.model.create.RequestParameterValueCreateDto;
import ru.relex.aim.service.model.get.RequestParameterValueGetDto;

import java.util.List;

/**
 * Maps between {@link RequestParameterValue} and it's DTOs.
 */
@Mapper(uses = IValueMapper.class, injectionStrategy = InjectionStrategy.CONSTRUCTOR)
public interface RequestParameterValueMapper {

  /**
   * Converts {@link RequestParameterValueCreateDto} to {@link RequestParameterValueCreateDto}.
   *
   * @param dto entity to convert
   */
  @Mapping(target = "id", ignore = true)
  @Mapping(target = "request", ignore = true)
  @Mapping(target = "parameter.id", source = "parameterId")
  RequestParameterValue fromCreateDto(RequestParameterValueCreateDto dto);

  /**
   *  Converts {@link RequestParameterValue} to {@link RequestParameterValueGetDto}.
   */
  @Mapping(target = "parameterId", source = "parameter.id")
  RequestParameterValueGetDto toGetDto(RequestParameterValue requestParameterValue);

  /**
   *  Converts list of {@link RequestParameterValue} to list of {@link RequestParameterValueGetDto}.
   */
  List<RequestParameterValueGetDto> toGetDto(List<RequestParameterValue> requestParameterValues);
}
