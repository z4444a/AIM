package ru.relex.aim.service.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import ru.relex.aim.repository.entity.CategoryPicture;
import ru.relex.aim.service.model.base.CategoryPictureDto;
import ru.relex.aim.service.model.create.CategoryPictureCreateDto;
import ru.relex.aim.service.model.get.CategoryPictureGetDto;
import ru.relex.aim.service.model.update.CategoryPictureUpdateDto;

/**
 * Maps between {@link CategoryPicture} and it's DTOs.
 *
 * @author Dmitriy Poshevelya
 */
@Mapper
public interface ICategoryPictureMapper {

  /**
   * Converts {@link CategoryPicture} to {@link CategoryPictureGetDto}.
   *
   * @param entity entity to convert
   */
  CategoryPictureGetDto toGetDto(CategoryPicture entity);

  /**
   * Converts {@link CategoryPictureCreateDto} to {@link CategoryPicture}.
   *
   * @param dto entity to convert
   */
  @Mapping(target = "id", ignore = true)
  CategoryPicture fromCreateDto(CategoryPictureCreateDto dto);

  /**
   * Converts {@link CategoryPictureUpdateDto} to {@link CategoryPicture}.
   *
   * @param dto entity to convert
   */
  CategoryPicture fromUpdateDto(CategoryPictureUpdateDto dto);
}
