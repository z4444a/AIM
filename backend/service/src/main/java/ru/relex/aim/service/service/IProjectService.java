package ru.relex.aim.service.service;

import java.util.List;
import java.util.Map;
import ru.relex.aim.service.filter.ProjectFilterParam;
import ru.relex.aim.service.model.base.NamedDto;
import ru.relex.aim.service.model.base.PageModel;
import ru.relex.aim.service.model.get.ProjectGetDto;

import javax.validation.constraints.NotNull;

/**
 * Manages {@link ru.relex.aim.repository.entity.Project}.
 *
 * @author Alexey Alimov
 */
public interface IProjectService {

  /**
   * Returns a DTO of {@link ru.relex.aim.repository.entity.Project} by the given identifier.
   *
   * @param id identifier by which to find. May never be null.
   * @return DTO if found. Null otherwise.
   */
  ProjectGetDto get(int id);

  /**
   * Returns a page of {@link ru.relex.aim.repository.entity.Project}
   * instances and applies the given filter.
   *
   * @param page page number.
   * @param pageSize amount of elements to return in a page.
   * @param filter filter Filter object. May be null
   * @return all instances with applied filter. Will never be null.
   */
  PageModel<ProjectGetDto> getAll(Map<ProjectFilterParam, Object> filter, int page, int pageSize);

  /**
   * Returns list of active project.
   *
   * @return list of all project if user is admin, list of project in which the current user participates otherwise.
   */
  List<NamedDto> getSuggestions();
}
