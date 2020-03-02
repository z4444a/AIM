package ru.relex.aim.service.sort;

import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;

/**
 * Represents columns by which {@link ru.relex.aim.repository.entity.Request} can be sorted.
 *
 * @author Alexey Alimov
 */
public enum RequestSort implements ISortBuilder {
  ID("id", "id"),
  AUTHOR("author", "author.lastName") {
    @Override
    public Sort getSort(Direction direction) {
      return Sort.by(direction, getPropertyName())
          .and(Sort.by(direction, "author.firstName"));
    }
  },
  PROJECT("project", "project.name"),
  CREATION("creation", "creation"),
  OWNER("owner", "owner.lastName") {
    @Override
    public Sort getSort(Direction direction) {
      return Sort.by(direction, getPropertyName())
          .and(Sort.by(direction, "owner.firstName"));
    }
  },
  STATUS("status", "status.name"),
  TYPE("type", "type.name"),
  STATE("state", "state");

  private final String columnName;
  private final String propertyName;

  RequestSort(String columnName, String propertyName) {
    this.columnName = columnName;
    this.propertyName = propertyName;
  }

  public String getColumnName() {
    return columnName;
  }

  public String getPropertyName() {
    return propertyName;
  }

  /**
   * Returns {@link ru.relex.aim.repository.entity.Request} based on a case-insensitive enum name.
   *
   * @param source name of enum. Not case-sensitive
   * @return will be null if no match is found
   */
  public static RequestSort fromValue(String source) {
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

  @Override
  public Sort getSort(Sort.Direction direction) {
    return Sort.by(direction, propertyName);
  }
}
