package ru.relex.aim.service.mapper;

import java.util.List;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import ru.relex.aim.repository.entity.ListValue;
import ru.relex.aim.service.model.create.ListValueCreateDto;
import ru.relex.aim.service.model.get.ListValueGetDto;
import ru.relex.aim.service.model.update.ListValueUpdateDto;


/**
 * Maps between {@link ListValue} and it's DTOs.
 *
 * @author Dmitriy Poshevelya
 */
@Mapper
public interface IListValueMapper {
  /**
   * Converts  {@link ListValue}
   * to {@link ListValueGetDto}.
   *
   * @param entity entities to convert
   */
  ListValueGetDto toGetDto(ListValue entity);

  /**
   * Converts a list of {@link ListValue} to a list of {@link ListValueGetDto}.
   *
   * @param entities list of entities to convert
   */
  List<ListValueGetDto> toGetDto(List<ListValue> entities);

  /**
   * Converts  {@link ListValueCreateDto}
   * to {@link ListValue}.
   *
   * @param dto entities to convert
   */
  @Mapping(target = "id", ignore = true)
  @Mapping(target = "parameter", ignore = true)
  ListValue fromCreateDto(ListValueCreateDto dto);

  /**
   * Converts  {@link ListValueUpdateDto}
   * to {@link ListValue}.
   *
   * @param dto entities to convert
   */
  @Mapping(target = "parameter", ignore = true)
  ListValue fromUpdateDto(ListValueUpdateDto dto);
}
