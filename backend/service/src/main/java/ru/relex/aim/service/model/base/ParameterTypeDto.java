package ru.relex.aim.service.model.base;

import com.fasterxml.jackson.annotation.JsonCreator;

/**
 * DTO enum representing
 * {@link ru.relex.aim.repository.entity.Parameter}'s type.
 *
 * @author Alexey Alimov
 */
public enum ParameterTypeDto {
  NUMBER(1, "Number"),
  DATE(2, "Date"),
  TEXT(3, "Text"),
  LIST(4, "List"),
  REAL(5, "Real"),
  POOL(6, "Pool");

  private final int id;
  private final String name;

  ParameterTypeDto(int id, String name) {
    this.id = id;
    this.name = name;
  }

  public int getId() {
    return id;
  }

  public String getName() {
    return name;
  }

  /**
   * Returns {@link ParameterTypeDto} based on a case-insensitive enum name.
   *
   * @param source name of enum. Not case-sensitive
   * @return will be null if no match is found
   */
  @JsonCreator
  public static ParameterTypeDto fromValue(String source) {
    if (source == null) {
      return null;
    }

    for (final var value : values()) {
      if (value.getName().equalsIgnoreCase(source)) {
        return value;
      }
    }
    return null;
  }

  /**
   * Returns {@link ParameterTypeDto} based on an id value.
   *
   * @param id id value of status.
   * @return will be null if no match is found
   */
  public static ParameterTypeDto fromId(int id) {

    for (final var value : values()) {
      if (value.getId() == id) {
        return value;
      }
    }
    return null;
  }
}
