package ru.relex.aim.service.mapper;

import org.mapstruct.Mapper;
import ru.relex.aim.repository.entity.ProjectStatus;
import ru.relex.aim.service.model.base.ProjectStatusDto;

/**
 * Maps between {@link ProjectStatus} and it's DTOs.
 *
 * @author Alexey Alimov
 */
@Mapper
public class ProjectStatusMapper {

  /**
   * Converts {@link ProjectStatus} to {@link ProjectStatusDto}.
   *
   * @param entity entity to convert
   */
  public ProjectStatusDto toDto(ProjectStatus entity) {
    final int id = entity.getId();
    return ProjectStatusDto.fromId(id);
  }

  /**
   * Casts from DTO integer field to enum.
   *
   * @param statusId DTO integer field
   * @return enum value
   */
  public ProjectStatus toProjectStatusEnum(Integer statusId) {
    return ProjectStatus.fromId(statusId);
  }

  /**
   * Converts from enum value to integer field.
   *
   * @param status enum value
   * @return DTO integer field
   */
  public Integer fromProjectStatusEnum(ProjectStatus status) {
    return status.getId();
  }

}
