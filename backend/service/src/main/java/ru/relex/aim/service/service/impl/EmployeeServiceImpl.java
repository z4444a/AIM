package ru.relex.aim.service.service.impl;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import ru.relex.aim.commons.Role;
import ru.relex.aim.repository.entity.Employee;
import ru.relex.aim.repository.repository.EmployeeRepository;
import ru.relex.aim.repository.repository.ResourcePoolRepository;
import ru.relex.aim.service.filter.EmployeeFilterParams;
import ru.relex.aim.service.mapper.IEmployeeMapper;
import ru.relex.aim.service.model.base.NamedDto;
import ru.relex.aim.service.model.base.PageModel;
import ru.relex.aim.service.model.get.EmployeeGetDto;
import ru.relex.aim.service.service.IEmployeeService;
import ru.relex.aim.service.sort.EmployeeSort;
import ru.relex.aim.service.sort.SortingOrder;

import javax.validation.constraints.NotNull;
import java.util.List;
import java.util.Map;
import java.util.function.Predicate;

/**
 * Implementation of {@link IEmployeeService}.
 *
 * @author Anastasiya Zinchenko
 */
@Service
public class EmployeeServiceImpl implements IEmployeeService {

  private final EmployeeRepository repository;
  private final IEmployeeMapper mapper;
  private final ResourcePoolRepository poolRepository;

  /**
   * Constructor.
   */
  public EmployeeServiceImpl(EmployeeRepository repository,
                             IEmployeeMapper mapper,
                             ResourcePoolRepository poolRepository) {
    this.repository = repository;
    this.mapper = mapper;
    this.poolRepository = poolRepository;
  }

  /**
   * {@inheritDoc}
   */
  @Override
  public List<NamedDto> getAll() {
    return mapper.toNameGetDto(repository.findAll());
  }

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
  @Override
  public PageModel<EmployeeGetDto> getAll(Map<EmployeeFilterParams, Object> filter,
                                          @NotNull EmployeeSort sortBy, @NotNull SortingOrder order,
                                          int page, int pageSize) {
    final var spec = filter
        .entrySet()
        .stream()
        .map(x -> x.getKey().makeSpec(x.getValue()))
        .reduce((aggregated, item) -> aggregated.and(item))
        .orElse(null);
    final Sort sort = Sort.by(order.getDirection(), sortBy.getColumnName());
    final PageRequest pageRequest = PageRequest.of(page, pageSize, sort);
    final Page<Employee> employeePage = repository.findAll(spec, pageRequest);
    final List<EmployeeGetDto> getDto = mapper.toGetDto(employeePage.getContent());
    return new PageModel<>(getDto, employeePage.getTotalElements(), page);
  }

  /**
   * {@inheritDoc}
   */
  @Override
  public EmployeeGetDto get(Integer id) {
    return mapper.toGetDto(repository.findById(id).orElse(null));
  }

  /**
   * {@inheritDoc}
   */
  @Override
  public void giveUserRole(@NotNull Integer employeeId) {
    changeRole(employeeId, Role.USER, employee ->
        employee.getRole() == Role.POOL_OWNER && doesntHaveAnyPools(employee.getId())
    );
  }

  /**
   * {@inheritDoc}
   */
  @Override
  public void givePoolOwnerRole(@NotNull Integer employeeId) {
    changeRole(employeeId, Role.POOL_OWNER, employee ->
        employee.getRole().getPriority() <= Role.POOL_OWNER.getPriority()
    );
  }

  /**
   * {@inheritDoc}
   */
  @Override
  public EmployeeGetDto changeRole(@NotNull Integer id, @NotNull Integer roleId) {
    final Employee employee = repository.findById(id).get();
    final var role = Role.fromId(roleId);
    if (role == null) { //TODO: throw an exception in case role not exists
      return mapper.toGetDto(employee);
    } else {
      employee.setRole(role);
    }
    return mapper.toGetDto(repository.save(employee));
  }

  /**
   * Sets a new employee role in the system if condition returns true.
   *
   * @param employeeId employee identifier
   */
  private void changeRole(@NotNull Integer employeeId, Role newRole, Predicate<Employee> condition) {
    final Employee employee = repository.findById(employeeId).orElse(null);
    if (employee == null) {
      return;
    }
    if (condition.test(employee)) {
      employee.setRole(newRole);
      repository.save(employee);
    }
  }

  private boolean doesntHaveAnyPools(Integer id) {
    return poolRepository.getResourcePoolByOwnerId(id).isEmpty();
  }
}
