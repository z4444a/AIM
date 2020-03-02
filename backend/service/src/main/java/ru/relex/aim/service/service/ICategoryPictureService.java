package ru.relex.aim.service.service;


import ru.relex.aim.service.model.create.CategoryPictureCreateDto;
import ru.relex.aim.service.model.get.CategoryPictureGetDto;

import javax.validation.constraints.NotNull;

/**
 * Manages {@link ru.relex.aim.repository.entity.CategoryPicture}.
 *
 * @author Dmitriy Poshevelya
 */
public interface ICategoryPictureService {
  /**
   * Retrieves instance of
   * {@link ru.relex.aim.repository.entity.CategoryPicture} by id.
   *
   * @param id identifier of ResourcePool to find
   * @return instance if found. {@code null} otherwise
   */
  CategoryPictureGetDto get(@NotNull Integer id);

  /**
   * Creates an instance in database with information provided in DTO.
   *
   * @param categoryPicture DTO that holds information about entity to save May never be null.
   * @return saved entity.
   */
  CategoryPictureGetDto createIcon(CategoryPictureCreateDto categoryPicture);
}
