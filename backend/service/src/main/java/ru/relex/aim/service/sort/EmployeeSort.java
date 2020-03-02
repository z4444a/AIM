package ru.relex.aim.service.sort;

/**
 * Represents columns by which {@link ru.relex.aim.repository.entity.Employee} can be sorted.
 *
 * @author Sorokin Georgy
 */
public enum EmployeeSort implements IColumnSort {

  ID("id"),
  FIRST_NAME("firstName"),
  MIDDLE_NAME("middleName"),
  LAST_NAME("lastName"),
  POST("post"),
  ROLE("role.name");

  private String columnName;

  EmployeeSort(String columnName) {
    this.columnName = columnName;
  }

  @Override
  public String getColumnName() {
    return columnName;
  }

  /**
   * Returns {@link EmployeeSort} based on a case-insensitive enum name.
   *
   * @param source name of enum. Not case-sensitive
   * @return will be null if no match is found
   */
  public static EmployeeSort fromValue(String source) {
    if (source == null) {
      return null;
    }

    for (final var value : values()) {
      if (value.getColumnName().equalsIgnoreCase(source)) {
        return value;
      }
    }
    return null;
  }
}
