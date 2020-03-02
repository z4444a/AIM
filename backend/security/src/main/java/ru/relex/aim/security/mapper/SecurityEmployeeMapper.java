package ru.relex.aim.security.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import ru.relex.aim.commons.Role;
import ru.relex.aim.repository.entity.Employee;
import ru.relex.aim.security.intranet.model.result.User;

/**
 * Mapper.
 *
 * @author Sorokin Georgy
 */
@Mapper(imports = {Role.class})
public interface SecurityEmployeeMapper {

  /**
   * Maps from user to employee.
   * Does not change roles, projects and resource pools.
   */
  @Mapping(target = "post", source = "user.position")
  @Mapping(target = "projects", source = "old.projects")
  @Mapping(target = "resourcePools", source = "old.resourcePools")
  @Mapping(target = "id", source = "user.id")
  @Mapping(target = "firstName", source = "user.firstName")
  @Mapping(target = "lastName", source = "user.lastName")
  @Mapping(target = "middleName", source = "user.middleName")
  @Mapping(target = "role", expression = "java(old.getRole() == null ? Role.ADMIN : old.getRole())")
  Employee toEmployee(User user, Employee old);

}
