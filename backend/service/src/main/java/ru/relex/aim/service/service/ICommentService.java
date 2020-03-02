package ru.relex.aim.service.service;

import ru.relex.aim.service.model.create.CommentCreateDto;
import ru.relex.aim.service.model.get.CommentGetDto;

import javax.validation.constraints.NotNull;

/**
 * Approve or reject {@link ru.relex.aim.repository.entity.Comment}.
 *
 * @author Sorokin Georgy
 */
public interface ICommentService {
  /**
   * Creates an instance in database with information provided in DTO.
   *
   * @param createDto DTO that holds information about entity to save May never be null.
   * @return saved entity.
   */
  CommentGetDto create(@NotNull CommentCreateDto createDto);
}
