package ru.relex.aim.repository.repository;

import java.util.List;
import java.util.Optional;
import ru.relex.aim.commons.EntityType;
import ru.relex.aim.repository.entity.Employee;
import ru.relex.aim.repository.repository.base.BaseRepository;
import ru.relex.aim.repository.repository.base.EntityTypedRepository;

/**
 * Repository to manage {@link ru.relex.aim.repository.entity.Employee}.
 *
 * @author Nastya Zinchenko
 */
public interface EmployeeRepository extends BaseRepository<Employee, Integer>,
                                                EntityTypedRepository<Employee, Integer> {

  @Override
  default EntityType getEntityType() {
    return EntityType.EMPLOYEE;
  }

  /**
   * Finds all instances of {@link Employee}.
   */
  @Override
  List<Employee> findAll();

  /**
   * Finds employee with specified username.
   *
   * @param username username to find
   * @return employee with specified username or {@link Optional#empty()}
   */
  Optional<Employee> findByUsernameIgnoreCase(String username);
}
