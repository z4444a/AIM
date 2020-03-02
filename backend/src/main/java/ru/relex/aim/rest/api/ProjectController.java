package ru.relex.aim.rest.api;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import ru.relex.aim.service.filter.ProjectFilterParam;
import ru.relex.aim.service.model.base.NamedDto;
import ru.relex.aim.service.model.base.PageModel;
import ru.relex.aim.service.model.base.ProjectStatusDto;
import ru.relex.aim.service.model.get.ProjectGetDto;
import ru.relex.aim.service.service.IProjectService;

import java.util.List;

/**
 * Manages projects.
 *
 * @author Alexey Alimov
 */
@RestController
@RequestMapping("/projects")
public class ProjectController {

  private final IProjectService service;

  /**
   * Constructor.
   */
  public ProjectController(IProjectService service) {
    this.service = service;
  }

  /**
   * Fetches a DTO of project by the given identifier.
   *
   * @param id identifier by which to find.
   * @return DTO if found. Null otherwise.
   */
  @GetMapping("/{id}")
  public ProjectGetDto get(@PathVariable Integer id) {
    return service.get(id);
  }

  /**
   * Fetches a page of {@link ProjectGetDto} instances with applied sorting.
   *
   * @param page     page number. Defaults to 0.
   * @param pageSize size of a page. Must not be null.
   */
  @GetMapping
  public PageModel<ProjectGetDto> getAll(@RequestParam(required = false) String name,
                                         @RequestParam(required = false) ProjectStatusDto status,
                                         @RequestParam(defaultValue = "0") Integer page,
                                         @RequestParam Integer pageSize) {
    final var filterMap = ProjectFilterParam.buildParamMap(name, status);
    return service.getAll(filterMap, page, pageSize);
  }

  /**
   * Fetches list of {@link NamedDto} as suggestions of projects.
   */
  @GetMapping("/suggestions")
  public List<NamedDto> getSuggestions() {
    return service.getSuggestions();
  }
}
