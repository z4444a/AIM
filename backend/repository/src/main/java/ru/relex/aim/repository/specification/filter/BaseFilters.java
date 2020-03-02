package ru.relex.aim.repository.specification.filter;

import org.springframework.data.jpa.domain.Specification;

import java.util.Locale;

/**
 * Builds basic specifications.
 *
 * @author Alexey Alimov
 */
public class BaseFilters {

  /**
   * Empty protected constructor to allow inheritance.
   */
  protected BaseFilters() {
    // used by hibernate
  }

  /**
   * Returns equals specification.
   *
   * @param attribute entity attribute by which to filter.
   * @param value filter value.
   * @param <T> entity type.
   */
  public static <T> Specification<T> equalsFilter(String attribute, Object value) {
    return ((root, query, builder) -> builder.equal(root.get(attribute), value));
  }

  /**
   * Returns equals specification for nested property.
   *
   * @param rootAttribute entity attribute.
   * @param nestedAttribute nested attribute by which to filter.
   * @param value filter value.
   * @param <T> entity type.
   */
  public static <T> Specification<T> nestedEqualsFilter(String rootAttribute, String nestedAttribute, Object value) {
    return (((root, query, builder) -> builder.equal(root.get(rootAttribute).get(nestedAttribute), value)));
  }

  /**
   * Returns like specification.
   *
   * @param attribute entity attribute by which to filter.
   * @param value filter value.
   * @param <T> entity type.
   */
  public static <T> Specification<T> likeFilter(String attribute, Object value) {
    return ((root, query, builder) -> {
      final String pattern = ("%" + value + "%").toLowerCase(Locale.US);
      return builder.like(builder.lower(root.get(attribute)), pattern);
    });
  }

  /**
   * Returns like specification for nested property.
   *
   * @param rootAttribute entity attribute.
   * @param nestedAttribute nested attribute by which to filter.
   * @param value filter value.
   * @param <T> entity type.
   */
  public static <T> Specification<T> nestedLikeFilter(String rootAttribute, String nestedAttribute, Object value) {
    return ((root, query, builder) -> {
      final String pattern = ("%" + value + "%").toLowerCase(Locale.US);
      return builder.like(builder.lower(root.get(rootAttribute).get(nestedAttribute)), pattern);
    });
  }
}
