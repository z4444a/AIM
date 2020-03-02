package ru.relex.aim.service.filter;

import java.util.HashMap;
import java.util.Map;
import org.springframework.data.jpa.domain.Specification;
import ru.relex.aim.repository.entity.ResourceType;
import ru.relex.aim.repository.specification.filter.ResourceTypeFilters;

/**
 * Represents filter parameters passed by a client.
 *
 * @author Alexey Alimov
 */
public enum ResourceTypeFilterParams implements ISpecificationFilterBuilder<ResourceType> {
  NAME("name") {
    @Override
    public Specification<ResourceType> makeSpec(Object value) {
      return ResourceTypeFilters.likeFilter(getAttribute(), value);
    }
  },
  ACTIVE("active") {
    @Override
    public Specification<ResourceType> makeSpec(Object value) {
      return ResourceTypeFilters.equalsFilter(getAttribute(), value);
    }
  };

  private final String attribute;

  ResourceTypeFilterParams(String attribute) {
    this.attribute = attribute;
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
   * Builds a map with {@link ResourceTypeFilterParams}
   * as keys and filter values as values.
   *
   * @param name Converts to {@code NAME}
   * @param active Converts to {@code ACTIVE}
   * @return empty map if all arguments are null.
   */
  public static Map<ResourceTypeFilterParams, Object> buildParamMap(String name, Boolean active) {
    final Map<ResourceTypeFilterParams, Object> filterMap = new HashMap<>();
    if (name != null) {
      filterMap.put(NAME, name);
    }
    if (active != null) {
      filterMap.put(ACTIVE, active);
    }
    return filterMap;
  }
}
