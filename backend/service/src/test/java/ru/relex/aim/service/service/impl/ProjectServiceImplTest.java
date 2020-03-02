package ru.relex.aim.service.service.impl;

import java.util.Optional;
import java.util.Set;
import org.junit.jupiter.api.*;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import ru.relex.aim.repository.entity.Project;
import ru.relex.aim.repository.entity.ProjectStatus;
import ru.relex.aim.repository.repository.ProjectRepository;
import ru.relex.aim.security.model.AuthUser;
import ru.relex.aim.service.MapperTestConfiguration;
import ru.relex.aim.service.mapper.IProjectMapper;
import ru.relex.aim.service.model.base.ProjectStatusDto;
import ru.relex.aim.service.service.IProjectService;

/**
 * @author Nikita Skornyakov
 * @date 11.06.2019
 */
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
@ExtendWith(SpringExtension.class)
@ContextConfiguration(classes = MapperTestConfiguration.class)
class ProjectServiceImplTest {

  private IProjectService projectService;

  private final IProjectMapper projectMapper;

  @Autowired
  ProjectServiceImplTest(IProjectMapper projectMapper) {
    this.projectMapper = projectMapper;
  }

  @BeforeAll
  void setUp() {
    Project project = new Project();
    project.setId(1);
    project.setName("NAME");
    project.setStatus(ProjectStatus.IN_PROGRESS);
    project.setEmployees(Set.of());

    var projectRepo = Mockito.mock(ProjectRepository.class);
    Mockito.when(projectRepo.findById(Mockito.anyInt())).thenReturn(Optional.empty());
    Mockito.when(projectRepo.findById(1)).thenReturn(Optional.of(project));
    Mockito.when(projectRepo.findAll(Mockito.any(Specification.class), Mockito.any(Pageable.class)))
        .thenReturn(Page.empty());

    final var authUser = Mockito.mock(AuthUser.class);
    projectService = new ProjectServiceImpl(projectRepo, projectMapper, authUser);
  }

  @Test
  void getExists() {
    var getDto = projectService.get(1);
    Assertions.assertAll(
        () -> Assertions.assertEquals(1, getDto.getId()),
        () -> Assertions.assertEquals("NAME", getDto.getName()),
        () -> Assertions.assertEquals(ProjectStatusDto.ACTIVE, getDto.getStatus())
    );
  }

  @Test
  void getNotExists() {
    Assertions.assertNull(projectService.get(0));
  }

  @Test
  @Disabled
  void getAll() {
    projectService.getAll(null, 0, 10);
  }
}
