package ru.relex.aim.service.sort;

/**
 * Represents columns by which
 * {@link ru.relex.aim.repository.entity.ResourcePool} can be sorted.
 *
 * @author Dmitriy Poshevelya
 */
public enum ResourcePoolSort implements IColumnSort {
  ID("id"),
  NAME("name"),
  TYPE("resourceType"),
  CAPACITY("capacity"),
  DESCRIPTION("description"),
  OWNERS("owners"),
  ACTIVE("active");

  private String columnName;

  ResourcePoolSort(String columnName) {
    this.columnName = columnName;
  }

  @Override
  public String getColumnName() {
    return columnName;
  }

  /**
   * Returns {@link ResourcePoolSort} based on a not case-insensitive enum name.
   *
   * @param source name of enum. Not case-sensitive
   * @return will be null if no match is found
   */
  public static ResourcePoolSort fromValue(String source) {
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
