package ru.relex.aim.service.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import ru.relex.aim.repository.entity.RequestStatus;
import ru.relex.aim.repository.entity.RequestStatusChange;
import ru.relex.aim.service.model.get.RequestStatusChangeGetDto;

import java.util.List;

/**
 * Maps between {@link RequestStatusChange} and it's DTOs.
 * Constructs the entity by its fields.
 */
@Mapper
public interface IRequestStatusChangeMapper {

  /**
   * Constructs an {@link RequestStatusChange} entity by its fields.
   */
  @Mapping(target = "id", ignore = true)
  @Mapping(target = "request.id", source = "requestId")
  @Mapping(target = "author.id", source = "authorId")
  @Mapping(target = "status", source = "status")
  @Mapping(target = "datetime", ignore = true)
  RequestStatusChange constructEntity(Integer requestId, RequestStatus status, Integer authorId);

  /**
   * Converts {@link RequestStatusChange} to {@link RequestStatusChangeGetDto}.
   */
  @Mapping(target = "author.name", source = "entity.author.fullName")
  RequestStatusChangeGetDto toGetDto(RequestStatusChange entity);

  /**
   * Converts list of {@link RequestStatusChange} to list of {@link RequestStatusChangeGetDto}.
   */
  List<RequestStatusChangeGetDto> toGetDto(List<RequestStatusChange> entities);
}
