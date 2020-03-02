package ru.relex.aim.service.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import ru.relex.aim.repository.entity.Comment;
import ru.relex.aim.service.model.RequestAcceptDto;
import ru.relex.aim.service.model.create.CommentCreateDto;
import ru.relex.aim.service.model.get.CommentGetDto;

/**
 * Maps between {@link Comment} and it's DTOs.
 *
 * @author Sorokin Georgy
 */
@Mapper
public interface ICommentMapper {
  /**
   * Converts {@link CommentCreateDto} to {@link Comment}.
   *
   * @param dto DTO to convert
   */
  @Mapping(target = "id", ignore = true)
  @Mapping(target = "datetime", ignore = true)
  @Mapping(target = "author.id", source = "authorId")
  @Mapping(target = "request.id", source = "requestId")
  Comment fromCreateDto(CommentCreateDto dto);

  /**
   * Converts {@link Comment} to {@link CommentGetDto}.
   *
   * @param entity entity to convert
   */
  @Mapping(target = "author.name", expression = "java(employee.getFullName())")
  CommentGetDto toGetDto(Comment entity);

  /**
   * Converts {@link RequestAcceptDto} to {@link CommentCreateDto}.
   *
   * @param dto DTO to convert
   */
  @Mapping(target = "authorId", source = "authorId")
  @Mapping(target = "requestId", source = "dto.id")
  @Mapping(target = "content", source = "dto.comment")
  CommentCreateDto toCreateDto(RequestAcceptDto dto, Integer authorId);
}
