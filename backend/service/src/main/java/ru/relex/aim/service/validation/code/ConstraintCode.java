package ru.relex.aim.service.validation.code;

/**
 * Holds codes to constraints.
 * Used as a message in constraint violations in combination with {@link ParameterCode}.
 *
 * @author Alexey Alimov
 */
public class ConstraintCode {

  // Standard JSR-303 constraints codes 01-20
  public static final String NOT_NULL = "01";
  public static final String SIZE = "02";
  public static final String MIN = "03";

  // Constraints dealing with db entities.
  public static final String ENTITY_EXISTS = "21";

  // Constraints dealing with dates
  public static final String AFTER_NOW = "22";
  public static final String DATE_FRAME = "23";

  // Constraints dealing with parameter values
  public static final String INAPPROPRIATE_TYPE = "24";
  public static final String INVALID_VALUES = "25";

  public static final String FOREIGN_KEY_MATCH = "30";
  public static final String NUMBER_RANGE = "31";
  public static final String MISMATCH = "32";
  public static final String DUPLICATE = "33";

  // Resource type parameter constraints
  public static final String MAX_NUMBER_VALUE = "40";
  public static final String MIN_NUMBER_VALUE = "41";
  public static final String MAX_DATE_VALUE = "42";
  public static final String MIN_DATE_VALUE = "43";
  public static final String MAX_STRING_LENGTH = "44";
  public static final String UNAVAILABLE_VALUE = "45";
  public static final String REGEX_MISMATCH = "46";

  private ConstraintCode() {
  }
}
