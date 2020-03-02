package ru.relex.aim.security.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import ru.relex.aim.repository.entity.Employee;
import ru.relex.aim.repository.entity.Master;
import ru.relex.aim.security.model.AuthRequest;

/**
 * Casts {@link AuthRequest} to {@link Master}.
 *
 * @author Sorokin Georgy
 */
@Mapper
public interface MasterMapper {

  /**
   * Sets user's status as active.
   *
   * @param authRequest is instance of {@link AuthRequest}
   * @return entity
   */
  @Mapping(target = "active", constant = "true")
  @Mapping(target = "employee", ignore = true)
  Master toEntity(AuthRequest authRequest);

  /**
   * Creates master record from existing employee.
   */
  @Mapping(target = "employee", source = "employee")
  @Mapping(target = "login", source = "username")
  @Mapping(target = "password", expression = "java(new char[0])")
  @Mapping(target = "active", constant = "true")
  Master fromEmployee(Employee employee);
}
