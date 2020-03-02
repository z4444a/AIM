package ru.relex.aim.commons;

/**
 * Request parameter types.
 */
public enum ParameterType {
  NUMBER(1),
  DATE(2),
  TEXT(3),
  LIST(4),
  REAL(5),
  POOL(6);

  private final int id;

  ParameterType(int id) {
    this.id = id;
  }

  public int getId() {
    return id;
  }

  /**
   * Creates ParameterType form parameter type code.
   *
   * @param value parameter type id
   * @return {@link ParameterType} according to id
   */
  public static ParameterType getValue(Integer value) {
    if (value == null) {
      return null;
    }
    for (final ParameterType type : ParameterType.values()) {
      if (value.equals(type.getId())) {
        return type;
      }
    }
    return null;
  }
}
