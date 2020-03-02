package ru.relex.aim.service.service;

import ru.relex.aim.service.filter.EmployeeFilterParams;
import ru.relex.aim.service.model.base.NamedDto;
import ru.relex.aim.service.model.base.PageModel;
import ru.relex.aim.service.model.get.EmployeeGetDto;
import ru.relex.aim.service.sort.EmployeeSort;
import ru.relex.aim.service.sort.SortingOrder;

import javax.validation.constraints.NotNull;
import java.util.List;
import java.util.Map;

/**
 * Manages {@link ru.relex.aim.repository.entity.Employee}.
 *
 * @author Nastya Zinchenko
 */
public interface IEmployeeService {

  /**
   * Returns all full names of instances of{@link ru.relex.aim.repository.entity.Employee}.
   *
   * @return all instances.
   */
  List<NamedDto> getAll();

  /**
   * Returns a page of {@link ru.relex.aim.repository.entity.Employee} instances
   * and applies the given filter and sorting order.
   *
   * @param filter   Filter object. May be null
   * @param sortBy   Column name by which to sort. May never be null
   * @param order    Sorting order. May never be null.
   * @param page     page number.
   * @param pageSize amount of elements to return in a page.
   * @return all instances with applied filter. Will never be null.
   * @author Sorokin Georgy
   */
  PageModel<EmployeeGetDto> getAll(Map<EmployeeFilterParams, Object> filter,
                                   @NotNull EmployeeSort sortBy, @NotNull SortingOrder order,
                                   int page, int pageSize);

  /**
   * Returns an employee by his identifier.
   */
  EmployeeGetDto get(Integer id);

  /**
   * Sets employee role in the system.
   *
   * @param id     employee id
   * @param roleId employee role id
   * @return employee after change
   */
  EmployeeGetDto changeRole(@NotNull Integer id, @NotNull Integer roleId);

  /**
   * Sets employee role from POOL_OWNER to USER if he doesn't have pools.
   */
  void giveUserRole(@NotNull Integer employeeId);

  /**
   * Sets employee role as POOL_OWNER if he doesn't have a better role.
   */
  void givePoolOwnerRole(@NotNull Integer employeeId);
}
