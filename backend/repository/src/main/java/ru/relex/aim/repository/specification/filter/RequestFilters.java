package ru.relex.aim.repository.specification.filter;

import org.springframework.data.jpa.domain.Specification;
import ru.relex.aim.repository.entity.GeneralParameterValue;
import ru.relex.aim.repository.entity.RequestParameterValue;

import javax.persistence.criteria.Subquery;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.Root;
import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;
import java.time.ZoneOffset;

/**
 * Build specifications for {@link ru.relex.aim.repository.entity.Request}.
 *
 * @author Alexey ALimov
 */
public class RequestFilters extends BaseFilters {

  private static Subquery<Integer> paramFilters(CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder,
                                                String attribute, Integer id, Object value) {
    final var subquery = query.subquery(Integer.class);
    final Root<RequestParameterValue> paramValue = subquery.from(RequestParameterValue.class);
    return subquery
        .select(paramValue.get("request").get("id"))
        .where(
            criteriaBuilder.and(
                criteriaBuilder.equal(paramValue.get("parameter").get("id"), id),
                criteriaBuilder.equal(paramValue.get(attribute), value)
            )
        );
  }

  /**
   * Returns equals specification for stringParameterValue.
   */
  public static <T> Specification<T> stringParamLikeFilter(Object value) {
    return ((root, query, criteriaBuilder) -> {
      final var parameterValue = (GeneralParameterValue) value;
      return criteriaBuilder
          .in(root.get("id"))
          .value(
              paramFilters(query,  criteriaBuilder, "stringValue",
                  parameterValue.getId(), parameterValue.getValue().toString())
          );
    });
  }

  /**
   * Returns equals specification for numberParameterValue.
   */
  public static <T> Specification<T> numberParamLikeFilter(Object value) {
    return ((root, query, criteriaBuilder) -> {
      final var parameterValue = (GeneralParameterValue) value;
      return criteriaBuilder
          .in(root.get("id"))
          .value(
              paramFilters(query,  criteriaBuilder, "numberValue",
                  parameterValue.getId(), Integer.parseInt(parameterValue.getValue().toString()))
          );
    });
  }

  /**
   * Returns equals specification for realParameterValue.
   */
  public static <T> Specification<T> realParamLikeFilter(Object value) {
    return ((root, query, criteriaBuilder) -> {
      final var parameterValue = (GeneralParameterValue) value;
      return criteriaBuilder
          .in(root.get("id"))
          .value(
              paramFilters(query,  criteriaBuilder, "realValue",
                  parameterValue.getId(), Double.parseDouble(parameterValue.getValue().toString()))
          );
    });
  }

  /**
   * Returns equals specification for dateParametervalue.
   */
  public static <T> Specification<T> dateParamLikeFilter(Object value) {
    return ((root, query, criteriaBuilder) -> {
      final var parameterValue = (GeneralParameterValue) value;
      final Instant instant = Instant.parse(
          parameterValue.getValue().toString().substring(1,parameterValue.getValue().toString().length() - 1)
      );
      return criteriaBuilder
          .in(root.get("id"))
          .value(
              paramFilters(query,  criteriaBuilder, "dateValue",
                  parameterValue.getId(), LocalDate.ofInstant(instant, ZoneId.of(ZoneOffset.UTC.getId())))
          );
    });
  }

  /**
   * Returns equals specification for listParameterValue.
   */
  public static <T> Specification<T> listParamLikeFilter(Object value) {
    return ((root, query, criteriaBuilder) -> {
      final var parameterValue = (GeneralParameterValue) value;
      return criteriaBuilder
          .in(root.get("id"))
          .value(
              paramFilters(query, criteriaBuilder, "listValue",
                  parameterValue.getId(), Integer.parseInt(parameterValue.getValue().toString()))
          );
    });
  }
}
