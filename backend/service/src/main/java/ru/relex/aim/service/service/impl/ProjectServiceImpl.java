package ru.relex.aim.service.service.impl;

import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import ru.relex.aim.commons.Role;
import ru.relex.aim.repository.entity.Project;
import ru.relex.aim.repository.entity.ProjectStatus;
import ru.relex.aim.repository.repository.ProjectRepository;
import ru.relex.aim.security.model.AuthUser;
import ru.relex.aim.service.filter.ProjectFilterParam;
import ru.relex.aim.service.mapper.IProjectMapper;
import ru.relex.aim.service.model.base.NamedDto;
import ru.relex.aim.service.model.base.PageModel;
import ru.relex.aim.service.model.get.ProjectGetDto;
import ru.relex.aim.service.service.IProjectService;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;


/**
 * Manages {@link ru.relex.aim.repository.entity.Project}.
 *
 * @author Alexey Alimov
 */
@Service
public class ProjectServiceImpl implements IProjectService {

  private final ProjectRepository repository;
  private final IProjectMapper mapper;
  private final AuthUser authUser;

  /**
   * Constructor.
   */
  public ProjectServiceImpl(ProjectRepository repository, IProjectMapper mapper,
                            AuthUser authUser) {
    this.repository = repository;
    this.mapper = mapper;
    this.authUser = authUser;
  }

  /**
   * {@inheritDoc}
   */
  @Override
  public ProjectGetDto get(int id) {
    final var project = repository.findById(id).orElse(null);
    return mapper.toGetDto(project);
  }

  /**
   * {@inheritDoc}
   */
  @Override
  public PageModel<ProjectGetDto> getAll(Map<ProjectFilterParam, Object> filter, int page, int pageSize) {
    final var spec = filter
        .entrySet()
        .stream()
        .map((x) -> x.getKey().makeSpec(x.getValue()))
        .reduce((aggregated, item) -> aggregated.and(item))
        .orElse(null);

    final var pageRequest = PageRequest.of(page, pageSize);
    final var projectPage = repository.findAll(spec, pageRequest);
    final var projectsDto = mapper.toGetDto(projectPage.getContent());

    return new PageModel<>(projectsDto, projectPage.getTotalElements(), page);
  }

  /**
   * {@inheritDoc}
   */
  @Override
  public List<NamedDto> getSuggestions() {
    final int userId = authUser.getId();
    List<Project> projects;
    if (authUser.getRole().equals(Role.ADMIN)) {
      projects = repository.findAll();
    } else {
      projects = repository.getProjectsByEmployeeId(userId);
    }
    final var projectsInProgress = projects
        .stream()
        .filter(p -> p.getStatus() == ProjectStatus.IN_PROGRESS)
        .collect(Collectors.toList());
    return mapper.toNamedDto(projectsInProgress);
  }
}
