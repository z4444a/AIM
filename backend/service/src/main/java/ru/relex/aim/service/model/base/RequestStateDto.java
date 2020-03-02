package ru.relex.aim.service.model.base;

import com.fasterxml.jackson.annotation.JsonCreator;

/**
 * DTO enum representing
 * {@link ru.relex.aim.repository.entity.Request}'s state.
 *
 * @author Alexey Alimov
 */
public enum RequestStateDto {
  ACTIVE(1, "Active"),
  INACTIVE(2, "Inactive"),
  UNMONITORED(3, "Unmonitored");

  private final int id;
  private final String name;

  RequestStateDto(Integer id, String name) {
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
   * Returns {@link RequestStateDto} based on a case-insensitive enum name.
   *
   * @param source name of enum. Not case-sensitive
   * @return will be null if no match is found
   */
  @JsonCreator
  public static RequestStateDto fromValue(String source) {
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
   * Returns {@link RequestStateDto} based on an id value.
   *
   * @param id id value of state.
   * @return will be null if no match is found
   */
  public static RequestStateDto fromId(int id) {

    for (final var value : values()) {
      if (value.getId() == id) {
        return value;
      }
    }
    return null;
  }
}
