package ru.relex.aim.service.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import ru.relex.aim.repository.entity.ListValue;
import ru.relex.aim.repository.repository.ListValueRepository;
import ru.relex.aim.service.model.base.BaseDto;
import ru.relex.aim.service.model.base.ContentDto;

import java.util.List;

/**
 * Maps between {@link ListValueRepository} and it's DTOs.
 *
 * @author Nastya Zinchenko
 */
@Mapper
public interface IValueMapper {

  /**
   * Converts {@link ListValue} to {@link ContentDto}.
   *
   * @param entity entity to convert
   */
  ContentDto toGetDto(ListValue entity);

  /**
   * Converts a list of {@link ListValue}
   * to a list of {@link ContentDto}.
   *
   * @param entities entities to convert
   */
  List<ContentDto> toGetDto(List<ListValue> entities);

  /**
   * Converts {@link BaseDto} to {@link ListValueRepository}.
   *
   * @param dto entity to convert
   */
  @Mapping(target = "parameter", ignore = true)
  @Mapping(target = "order", ignore = true)
  @Mapping(target = "content", ignore = true)
  ListValue fromCreateDto(BaseDto dto);

}
