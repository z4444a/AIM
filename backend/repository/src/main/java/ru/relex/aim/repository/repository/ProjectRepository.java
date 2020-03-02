package ru.relex.aim.repository.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;
import ru.relex.aim.commons.EntityType;
import ru.relex.aim.repository.entity.Project;
import ru.relex.aim.repository.repository.base.BaseRepository;
import ru.relex.aim.repository.repository.base.EntityTypedRepository;

import java.util.List;

/**
 * Manages {@link Project}.
 *
 * @author Alexey Alimov
 */
public interface ProjectRepository extends BaseRepository<Project, Integer>,
    EntityTypedRepository<Project, Integer> {

  @Override
  default EntityType getEntityType() {
    return EntityType.PROJECT;
  }

  /**
   * Finds all project entities by user identifier.
   */
  @Query("SELECT u.projects FROM Employee u WHERE u.id = :userId")
  List<Project> getProjectsByEmployeeId(@Param("userId") int userId);
}
