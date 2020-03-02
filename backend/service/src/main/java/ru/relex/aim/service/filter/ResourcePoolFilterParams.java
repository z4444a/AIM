package ru.relex.aim.service.filter;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.data.jpa.domain.Specification;
import ru.relex.aim.commons.ParameterType;
import ru.relex.aim.repository.entity.GeneralParameterValue;
import ru.relex.aim.repository.entity.ResourcePool;
import ru.relex.aim.repository.specification.filter.RequestFilters;
import ru.relex.aim.repository.specification.filter.ResourceFilters;

/**
 * Represents filter parameters passed by a client.
 *
 * @author Dmitriy Poshevelya
 */
public enum ResourcePoolFilterParams implements ISpecificationFilterBuilder<ResourcePool> {
  NAME("name") {
    @Override
    public Specification<ResourcePool> makeSpec(Object value) {
      return ResourceFilters.likeFilter(getAttribute(), value);
    }
  },
  TYPE_ID("resourceType") {
    @Override
    public Specification<ResourcePool> makeSpec(Object value) {
      return ResourceFilters.nestedEqualsFilter(getAttribute(), "id", value);
    }
  },
  OWNER_ID("owners") {
    @Override
    public Specification<ResourcePool> makeSpec(Object value) {
      return ResourceFilters.existsOwner(value);
    }
  },
  ACTIVE("active") {
    @Override
    public Specification<ResourcePool> makeSpec(Object value) {
      return ResourceFilters.equalsFilter(getAttribute(), value);
    }
  };

  private final String attribute;

  ResourcePoolFilterParams(String attribute) {
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
   * Builds a map with {@link ResourcePoolFilterParams}
   * as keys and filter values as values.
   *
   * @param name Converts to {@code NAME}
   * @param active Converts to {@code ACTIVE}
   * @return will be null if all keys are null.
   */
  public static Map<ISpecificationFilterBuilder<ResourcePool>, Object> buildParamMap(String name, Integer type,
                                                                                     Boolean active,
                                                                                     List<GeneralParameterValue>
                                                                                         objectMap) {
    final Map<ISpecificationFilterBuilder<ResourcePool>, Object> filterMap = new HashMap<>();
    if (name != null) {
      filterMap.put(NAME, name);
    }
    if (type != null) {
      filterMap.put(TYPE_ID, type);
    }
    if (active != null) {
      filterMap.put(ACTIVE, active);
    }
    objectMap.forEach((value) ->
        filterMap.put((objectValue) -> {
          switch (ParameterType.getValue(value.getParameterType())) {
            case TEXT: return ResourceFilters.stringParamLikeFilter(value);
            case NUMBER: return ResourceFilters.numberParamLikeFilter(value);
            case REAL: return ResourceFilters.realParamLikeFilter(value);
            case DATE: return ResourceFilters.dateParamLikeFilter(value);
            case LIST: return ResourceFilters.listParamLikeFilter(value);
            default:
              return null;
          }
        }, value.getValue()));

    return filterMap;
  }
}
