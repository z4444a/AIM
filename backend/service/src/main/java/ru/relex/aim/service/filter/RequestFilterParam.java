package ru.relex.aim.service.filter;

import org.springframework.data.jpa.domain.Specification;
import ru.relex.aim.commons.ParameterType;
import ru.relex.aim.repository.entity.GeneralParameterValue;
import ru.relex.aim.repository.entity.Request;
import ru.relex.aim.repository.specification.filter.RequestFilters;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Represents filter parameters passed by a client.
 *
 * @author Alexey Alimov
 */
public enum RequestFilterParam implements ISpecificationFilterBuilder<Request> {
  TYPE_NAME("type") {
    @Override
    public Specification<Request> makeSpec(Object value) {
      return RequestFilters.nestedLikeFilter(getAttribute(), "name", value);
    }
  },
  DESCRIPTION("description") {
    @Override
    public Specification<Request> makeSpec(Object value) {
      return RequestFilters.likeFilter(getAttribute(), value);
    }
  },
  AUTHOR_ID("author") {
    @Override
    public Specification<Request> makeSpec(Object value) {
      return RequestFilters.nestedEqualsFilter(getAttribute(), "id", value);
    }
  },
  TYPE_ID("type") {
    @Override
    public Specification<Request> makeSpec(Object value) {
      return RequestFilters.nestedEqualsFilter(getAttribute(), "id", value);
    }
  },
  STATUS_ID("status") {
    @Override
    public Specification<Request> makeSpec(Object value) {
      return RequestFilters.equalsFilter(getAttribute(), value);
    }
  };

  private final String attribute;

  RequestFilterParam(String attribute) {
    this.attribute = attribute;
  }

  public String getAttribute() {
    return attribute;
  }

  /**
   * Builds a map with {@link RequestFilterParam}
   * as keys and filter values as values.
   *
   * @param typeId Converts to {@code TYPE_ID}
   * @param description Converts to {@code DESCRIPTION}
   * @param statusId Converts to {@code STATUS_ID}
   * @return empty map if all arguments are null.
   */
  public static Map<ISpecificationFilterBuilder<Request>, Object> buildParamMap(Integer typeId, String description,
                                                                                Integer statusId, 
                                                                                List<GeneralParameterValue> objectMap) {
    final Map<ISpecificationFilterBuilder<Request>, Object> filterMap = new HashMap<>();
    if (typeId != null) {
      filterMap.put(TYPE_ID, typeId);
    }
    if (description != null) {
      filterMap.put(DESCRIPTION, description);
    }
    if (statusId != null) {
      filterMap.put(STATUS_ID, statusId);
    }
    objectMap.forEach((value) ->
        filterMap.put((objectValue) -> {
          switch (ParameterType.getValue(value.getParameterType())) {
            case TEXT: return RequestFilters.stringParamLikeFilter(value);
            case NUMBER: return RequestFilters.numberParamLikeFilter(value);
            case REAL: return RequestFilters.realParamLikeFilter(value);
            case DATE: return RequestFilters.dateParamLikeFilter(value);
            case LIST: return RequestFilters.listParamLikeFilter(value);
            default: return null;
          }

        }, value.getValue()));

    return filterMap;
  }
}
