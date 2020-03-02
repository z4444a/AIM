package ru.relex.aim.service.mapper;

import java.util.List;

import org.mapstruct.Mapper;
import ru.relex.aim.repository.entity.Project;
import ru.relex.aim.service.model.base.NamedDto;
import ru.relex.aim.service.model.get.ProjectGetDto;

/**
 * Maps between {@link Project} and it's DTOs.
 *
 * @author Alexey Alimov
 */
@Mapper(uses = ProjectStatusMapper.class)
public interface IProjectMapper {

  /**
   * Converts {@link Project} to {@link ProjectGetDto}.
   *
   * @param entity entity to convert
   */
  ProjectGetDto toGetDto(Project entity);

  /**
   * Converts a list of {@link Project} to a list of {@link ProjectGetDto}.
   *
   * @param entities list of entities to convert
   */
  List<ProjectGetDto> toGetDto(List<Project> entities);

  /**
   * Converts a list of {@link Project} to a list of {@link NamedDto}.
   */
  List<NamedDto> toNamedDto(List<Project> entities);
}
