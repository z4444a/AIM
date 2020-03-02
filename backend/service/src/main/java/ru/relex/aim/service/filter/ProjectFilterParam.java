package ru.relex.aim.service.filter;

import java.util.HashMap;
import java.util.Map;
import org.springframework.data.jpa.domain.Specification;
import ru.relex.aim.repository.entity.Project;
import ru.relex.aim.repository.specification.filter.ProjectFilters;
import ru.relex.aim.service.model.base.ProjectStatusDto;

/**
 * Represents filter parameters passed by a client.
 *
 * @author Alexey Alimov
 */
public enum ProjectFilterParam implements ISpecificationFilterBuilder<Project> {
  NAME("name") {
    @Override
    public Specification<Project> makeSpec(Object value) {
      return ProjectFilters.likeFilter(getAttribute(), value);
    }
  },
  STATUS("status") {
    @Override
    public Specification<Project> makeSpec(Object value) {
      return ProjectFilters.nestedEqualsFilter(getAttribute(), "id", value);
    }
  };

  private final String attribute;

  ProjectFilterParam(String attribute) {
    this.attribute = attribute;
  }

  public String getAttribute() {
    return attribute;
  }

  /**
   * Builds a map with {@link ProjectFilterParam}as keys
   * and filter values as values.
   *
   * @param name Converts to {@code NAME}
   * @return empty map if all arguments are null.
   */
  public static Map<ProjectFilterParam, Object> buildParamMap(String name, ProjectStatusDto status) {
    final Map<ProjectFilterParam, Object> filterMap = new HashMap<>();
    if (name != null) {
      filterMap.put(NAME, name);
    }
    if (status != null) {
      filterMap.put(STATUS, status.getId());
    }
    return filterMap;
  }
}
