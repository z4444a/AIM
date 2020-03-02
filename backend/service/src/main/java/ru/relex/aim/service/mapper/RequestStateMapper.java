package ru.relex.aim.service.mapper;

import org.mapstruct.Mapper;
import ru.relex.aim.repository.entity.RequestState;
import ru.relex.aim.repository.entity.ResourceType;
import ru.relex.aim.service.model.base.RequestStateDto;


/**
 * Maps between {@link RequestState} and it's DTOs.
 *
 * @author Alexey Alimov
 */
@Mapper
public class RequestStateMapper {

  /**
   * Converts {@link RequestState} to {@link RequestStateDto}.
   *
   * @param entity entity to convert
   */
  public RequestStateDto toDto(RequestState entity) {
    final int id = entity.getId();
    return RequestStateDto.fromId(id);
  }

  /**
   * Converts {@link RequestStateDto} to {@link RequestState}.
   */
  public RequestState toEntity(RequestStateDto dto) {
    return RequestState.fromId(dto.getId());
  }
}
