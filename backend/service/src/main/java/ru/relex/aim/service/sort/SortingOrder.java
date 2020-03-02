package ru.relex.aim.service.sort;

import org.springframework.data.domain.Sort.Direction;

/**
 * Represents order of sorting.
 */
public enum SortingOrder {
  ASC("asc", Direction.ASC),
  DESC("desc", Direction.DESC);

  private final String name;
  private final Direction direction;

  SortingOrder(String name, Direction direction) {
    this.name = name;
    this.direction = direction;
  }

  public String getName() {
    return name;
  }

  public Direction getDirection() {
    return direction;
  }

  /**
   * Returns {@link SortingOrder} based on a not case-insensitive enum name.
   *
   * @param source name of enum. Not case-sensitive
   * @return will be null if no match is found
   */
  public static SortingOrder fromValue(String source) {
    if (source == null) {
      return null;
    }
    for (final var value: values()) {
      if (value.getName().equalsIgnoreCase(source)) {
        return value;
      }
    }
    return null;
  }
}
