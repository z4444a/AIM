package ru.relex.aim.rest.api;

import org.springframework.http.MediaType;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import ru.relex.aim.commons.SystemRole;
import ru.relex.aim.security.intranet.UserService;
import ru.relex.aim.service.filter.EmployeeFilterParams;
import ru.relex.aim.service.model.base.NamedDto;
import ru.relex.aim.service.model.base.PageModel;
import ru.relex.aim.service.model.get.EmployeeGetDto;
import ru.relex.aim.service.service.IEmployeeService;
import ru.relex.aim.service.sort.EmployeeSort;
import ru.relex.aim.service.sort.SortingOrder;

import java.util.List;

/**
 * Controller class for managing employees.
 *
 * @author Nastya Zinchenko
 */
@RestController
@RequestMapping("/employees")
public class EmployeeController {

  private final IEmployeeService service;
  private final UserService userService;

  /**
   * Constructor.
   */
  public EmployeeController(IEmployeeService service, UserService userService) {
    this.service = service;
    this.userService = userService;
  }

  /**
   * Fetches full names of all instances of Employee.
   */
  @GetMapping(path = "/names", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
  public List<NamedDto> getAllEmployeesNames() {
    return service.getAll();
  }

  /**
   * Synchronizes intranet users and database employees.
   */
  @Secured({SystemRole.ADMIN})
  @GetMapping(path = "/synchronize")
  public void synchronize() {
    userService.synchronize();
  }

  /**
   * Fetches a page of employees with applied filters and sorting.
   *
   * @param name     filter by name.
   * @param sortBy   column by which to sort by. Defaults to id.
   * @param order    sorting order. Defaults to ascending.
   * @param page     page number. Defaults to 0.
   * @param pageSize size of a page. Defaults to 10.
   */
  @Secured({SystemRole.ADMIN})
  @GetMapping(produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
  public PageModel<EmployeeGetDto> getAll(
      @RequestParam(required = false) String name,
      @RequestParam(defaultValue = "id") EmployeeSort sortBy,
      @RequestParam(defaultValue = "asc") SortingOrder order,
      @RequestParam(defaultValue = "0") Integer page,
      @RequestParam Integer pageSize) {
    final var filterMap = EmployeeFilterParams.buildParamMap(name);
    return service.getAll(filterMap, sortBy, order, page, pageSize);
  }

  /**
   * Returns an employee by his identifier.
   */
  @Secured({SystemRole.ADMIN})
  @GetMapping(
      path = "/{id}",
      produces = MediaType.APPLICATION_JSON_UTF8_VALUE
  )
  public EmployeeGetDto getEmployee(@PathVariable Integer id) {
    return service.get(id);
  }

  /**
   * Sets employee role in the system. Available to administrator.
   *
   * @param id     employee id
   * @param roleId employee role id
   * @return employee after change
   */
  @Secured({SystemRole.ADMIN})
  @PutMapping(
      path = "/{id}/role",
      produces = MediaType.APPLICATION_JSON_UTF8_VALUE
  )
  public EmployeeGetDto changeRole(@PathVariable Integer id, @RequestParam Integer roleId) {
    return service.changeRole(id, roleId);
  }
}
