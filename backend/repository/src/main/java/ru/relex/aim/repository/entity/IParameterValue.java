package ru.relex.aim.repository.entity;

import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;

/**
 * The parent class of parameter value.
 */
public interface IParameterValue {
  ZoneId TIME_ZONE = ZoneId.of("Europe/Moscow");

  /**
   * Getter.
   *
   * @return {@link Parameter} which stores the right value type.
   */
  Parameter getParameter();

  /**
   * Getter.
   *
   * @return the number value if it exists or {@code null} otherwise.
   */
  Integer getNumberValue();

  /**
   * Getter.
   *
   * @return the string value if it exists or {@code null} otherwise.
   */
  String getStringValue();

  /**
   * Getter.
   *
   * @return the date value if it exists or {@code null} otherwise.
   */
  LocalDate getDateValue();

  /**
   * Getter.
   *
   * @return the real value if it exists or {@code null} otherwise.
   */
  Float getRealValue();

  /**
   * Getter.
   *
   * @return the list value if it exists or {@code null} otherwise.
   */
  ListValue getListValue();

  /**
   * Casts parameter value to the string using toString() method.
   *
   * @return the parameter value as string if the parameter type is defined or empty string otherwise.
   * @apiNote determines a type of parameter value using getParameter() methods and returns a value:
   * <ul>
   * <li>the text value - without any manipulation;</li>
   * <li>the number and real value - after conversion to string;</li>
   * <li>the list value - as its content;</li>
   * <li>the date value - as string after conversion from {@link Instant} using time zone.</li>
   * </ul>
   */
  default String asStringValue() {
    if (getParameter() == null || getParameter().getParameterType() == null) {
      return "";
    }
    switch (ru.relex.aim.commons.ParameterType.getValue(getParameter().getParameterType().getId())) {
      case TEXT:
        return getStringValue();
      case NUMBER:
        return getNumberValue().toString();
      case REAL:
        return getRealValue().toString();
      case DATE:
        return getDateValue().atStartOfDay(TIME_ZONE).toInstant().toString();
      case LIST:
        return getListValue().getContent();
      default:
        return "";
    }
  }
}
