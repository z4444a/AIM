package ru.relex.aim.service.filter;

import org.springframework.data.jpa.domain.Specification;
import ru.relex.aim.repository.entity.Parameter;
import ru.relex.aim.commons.modifier.ParameterModifier;
import ru.relex.aim.repository.specification.filter.ParameterFilters;

import java.util.HashMap;
import java.util.Map;

/**
 * Represents filter parameters passed by a client.
 *
 * @author Alexey Alimov
 */
public enum ParameterFilterParam implements ISpecificationFilterBuilder<Parameter> {
  TYPE_ID("resourceType") {
    @Override
    public Specification<Parameter> makeSpec(Object value) {
      return ParameterFilters.nestedEqualsFilter(getAttribute(), "id", value);
    }
  },
  MODIFIER("modifier") {
    @Override
    public Specification<Parameter> makeSpec(Object value) {
      return ParameterFilters.equalsFilter(getAttribute(), value);
    }
  },
  VISIBLE_TO_OWNER("visibleToOwner") {
    @Override
    public Specification<Parameter> makeSpec(Object value) {
      return ParameterFilters.equalsFilter(getAttribute(), value);
    }
  };

  private final String attribute;

  ParameterFilterParam(String attribute) {
    this.attribute = attribute;
  }

  public String getAttribute() {
    return attribute;
  }

  /**
   * Builds a map with {@link ProjectFilterParam}as keys
   * and filter values as values.
   *
   * @param modifier Converts to {@code NAME}
   * @return empty map if all arguments are null.
   */
  public static Map<ParameterFilterParam, Object> buildParamMap(int typeId,
                                                                ParameterModifier modifier,
                                                                Boolean isOwner) {
    final Map<ParameterFilterParam, Object> filterMap = new HashMap<>();
    filterMap.put(TYPE_ID, typeId);
    if (modifier != null) {
      filterMap.put(MODIFIER, modifier);
    }
    if (isOwner != null) {
      filterMap.put(VISIBLE_TO_OWNER, true);
    }
    return filterMap;
  }
}
