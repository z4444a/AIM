package ru.relex.aim.service.sort;

/**
 * Represents columns by which
 * {@link ru.relex.aim.repository.entity.ResourceType} can be sorted.
 *
 * @author Alexey Alimov
 */
public enum ResourceTypeSort implements IColumnSort {
  ID("id"),
  NAME("name"),
  DESCRIPTION("description"),
  ACTIVE("active");

  private String columnName;

  ResourceTypeSort(String columnName) {
    this.columnName = columnName;
  }

  @Override
  public String getColumnName() {
    return columnName;
  }

  /**
   * Returns {@link ResourceTypeSort} based on a not case-insensitive enum name.
   *
   * @param source name of enum. Not case-sensitive
   * @return will be null if no match is found
   */
  public static ResourceTypeSort fromValue(String source) {
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
