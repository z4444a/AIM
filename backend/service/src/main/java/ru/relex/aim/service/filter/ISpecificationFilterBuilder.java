package ru.relex.aim.service.filter;

import org.springframework.data.jpa.domain.Specification;

/**
 * Implement this with filter enums.
 *
 * @param <T> entity type
 * @author Alexey Alimov
 */
public interface ISpecificationFilterBuilder<T> {

  /**
   * Makes specification for this filter parameter.
   *
   * @param value filter value
   * @return new specification
   */
  Specification<T> makeSpec(Object value);
}
