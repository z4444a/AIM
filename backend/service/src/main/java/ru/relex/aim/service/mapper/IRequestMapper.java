package ru.relex.aim.service.mapper;

import org.mapstruct.AfterMapping;
import org.mapstruct.InjectionStrategy;
import org.mapstruct.IterableMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.Named;
import ru.relex.aim.repository.entity.Request;
import ru.relex.aim.service.model.create.RequestCreateDto;
import ru.relex.aim.service.model.get.RequestGetDto;
import ru.relex.aim.service.model.get.RequestGetDtoWithComments;
import ru.relex.aim.service.model.update.RequestUpdateDto;

import java.util.List;

/**
 * Maps between {@link Request} and it's DTOs.
 *
 * @author Alexey Alimov
 */
@Mapper(uses = {RequestStateMapper.class, RequestParameterValueMapper.class, IParamValueShortVerMapper.class,
    ICommentMapper.class}, injectionStrategy = InjectionStrategy.CONSTRUCTOR)
public interface IRequestMapper {

  String FULL_NAME = "java(employee.getFullName())";

  /**
   * Converts {@link Request} to {@link RequestGetDto}.
   *
   * @param entity entity to convert
   */
  @Mapping(target = "author.name", expression = FULL_NAME)
  @Mapping(target = "owner.name", expression = FULL_NAME)
  @Named("dto")
  RequestGetDto toGetDto(Request entity);

  /**
   * Converts a list of {@link Request} to a list of {@link RequestGetDto}.
   *
   * @param entities list of entities to convert
   * @return entity to present to client
   */
  @IterableMapping(qualifiedByName = "dto")
  List<RequestGetDto> toGetDto(List<Request> entities);

  /**
   * Converts {@link Request} to {@link RequestGetDto}.
   *
   * @param entity entity to convert
   */
  @Mapping(target = "author.name", expression = FULL_NAME)
  @Mapping(target = "owner.name", expression = FULL_NAME)
  RequestGetDtoWithComments toGetDtoWithComments(Request entity);

  /**
   * Converts {@link RequestCreateDto} to {@link Request}.
   *
   * @param dto DTO to convert
   */
  @Mapping(target = "id", ignore = true)
  @Mapping(target = "creation", ignore = true)
  @Mapping(target = "owner", ignore = true)
  @Mapping(target = "status", ignore = true)
  @Mapping(target = "state", ignore = true)
  @Mapping(target = "needsBackup", ignore = true)
  @Mapping(target = "type.id", source = "typeId")
  @Mapping(target = "pool.id", source = "poolId")
  @Mapping(target = "author.id", source = "authorId")
  @Mapping(target = "createdBy.id", source = "createdById")
  @Mapping(target = "project.id", source = "projectId")
  @Mapping(target = "requestParameterValues", source = "resourceTypeParams")
  @Mapping(target = "amount", defaultValue = "0")
  @Mapping(target = "comments", ignore = true)
  Request fromCreateDto(RequestCreateDto dto);

  /**
   * Converts {@link RequestUpdateDto} to {@link Request}.
   *
   * @param dto DTO to convert
   */
  @Mapping(target = "id", ignore = true)
  @Mapping(target = "creation", ignore = true)
  @Mapping(target = "requestParameterValues", ignore = true)
  @Mapping(target = "type.id", source = "typeId")
  @Mapping(target = "pool.id", source = "poolId")
  @Mapping(target = "author.id", source = "authorId")
  @Mapping(target = "createdBy.id", source = "createdById")
  @Mapping(target = "owner.id", source = "ownerId")
  @Mapping(target = "project.id", source = "projectId")
  @Mapping(target = "status", ignore = true)
  @Mapping(target = "amount", defaultValue = "0")
  @Mapping(target = "comments", ignore = true)
  Request fromUpdateDto(RequestUpdateDto dto);

  /**
   * Sets {@code owner}, {@code project} and {@code pool} to null if given ids are null.
   */
  @AfterMapping
  default void setEmptyObjectsToNull(RequestUpdateDto updateDto, @MappingTarget Request result) {
    if (updateDto.getOwnerId() == null) {
      result.setOwner(null);
    }
    if (updateDto.getPoolId() == null) {
      result.setPool(null);
    }
    if (updateDto.getProjectId() == null) {
      result.setProject(null);
    }
  }

  /**
   * Sets {@code pool} and {@code project} to null if given id is null.
   */
  @AfterMapping
  default void setEmptyObjectsToNull(RequestCreateDto createDto, @MappingTarget Request result) {
    if (createDto.getPoolId() == null) {
      result.setPool(null);
    }
    if (createDto.getProjectId() == null) {
      result.setProject(null);
    }
  }
}
