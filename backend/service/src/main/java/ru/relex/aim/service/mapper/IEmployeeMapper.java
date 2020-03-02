package ru.relex.aim.service.mapper;

import java.util.List;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import ru.relex.aim.repository.entity.Employee;
import ru.relex.aim.service.model.UserProfileDto;
import ru.relex.aim.service.model.base.BaseDto;
import ru.relex.aim.service.model.base.NamedDto;
import ru.relex.aim.service.model.get.EmployeeGetDto;

/**
 * Maps between {@link Employee} and it's DTOs.
 *
 * @author Nastya Zinchenko
 */
@Mapper
public interface IEmployeeMapper {

  /**
   * Converts {@link Employee} to {@link EmployeeGetDto}.
   *
   * @param employee entity to convert
   */
  @Mapping(target = "name", expression = "java(employee.getFullName())")
  EmployeeGetDto toGetDto(Employee employee);

  /**
   * Connverts a list of {@link Employee}
   * to a list {@link EmployeeGetDto}.
   *
   * @param entities entities to convert
   */
  List<EmployeeGetDto> toGetDto(List<Employee> entities);

  /**
   * Converts a list of {@link Employee}
   * to a list {@link NamedDto}.
   *
   * @param entities entities to convert
   */
  List<NamedDto> toNameGetDto(List<Employee> entities);

  /**
   * Converts {@link BaseDto} to {@link Employee}.
   *
   * @param dto entity to convert
   */
  @Mapping(target = "id", source = "dto.id")
  @Mapping(target = "firstName", ignore = true)
  @Mapping(target = "lastName", ignore = true)
  @Mapping(target = "middleName", ignore = true)
  @Mapping(target = "post", ignore = true)
  @Mapping(target = "projects", ignore = true)
  @Mapping(target = "resourcePools", ignore = true)
  @Mapping(target = "role", ignore = true)
  @Mapping(target = "synced", ignore = true)
  @Mapping(target = "username", ignore = true)
  Employee fromCreateDto(BaseDto dto);

  /**
   * Converts employee entity data to user-profile.
   */
  UserProfileDto fromEmployee(Employee employee);
}

