package ru.relex.aim.service.filter;

import org.springframework.data.jpa.domain.Specification;
import ru.relex.aim.repository.entity.Employee;
import ru.relex.aim.repository.specification.filter.EmployeeFilters;

import java.util.HashMap;
import java.util.Map;

/**
 * Represents filter parameters passed by a client.
 *
 * @author Sorokin Georgy
 */
public enum EmployeeFilterParams implements ISpecificationFilterBuilder<Employee> {
  LAST_NAME("lastName");

  private final String attribute;

  EmployeeFilterParams(String attribute) {
    this.attribute = attribute;
  }

  @Override
  public Specification<Employee> makeSpec(Object value) {
    return EmployeeFilters.likeFilter(getAttribute(), value);
  }

  /**
   * Fetches name of entity attribute to which filter is applied.
   *
   * @return attribute name.
   */
  public String getAttribute() {
    return attribute;
  }

  /**
   * Builds map with {@link EmployeeFilterParams}.
   *
   * @param lastName Converts to {@code LAST_NAME}
   * @return will be null if all keys are null.
   */
  public static Map<EmployeeFilterParams, Object> buildParamMap(String lastName) {
    final Map<EmployeeFilterParams, Object> filterMap = new HashMap<>();
    if (lastName != null) {
      filterMap.put(LAST_NAME, lastName);
    }
    return filterMap;
  }
}
