package ru.relex.aim.service.model.base;

import com.fasterxml.jackson.annotation.JsonCreator;

/**
 * DTO enum representing
 * {@link ru.relex.aim.repository.entity.Project}'s status.
 *
 * @author Alexey Alimov
 */
public enum ProjectStatusDto {
  ACTIVE(1, "Active"),
  DONE(2, "Done");

  private final int id;
  private final String name;

  ProjectStatusDto(Integer id, String name) {
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
   * Returns {@link ProjectStatusDto} based on a case-insensitive enum name.
   *
   * @param source name of enum. Not case-sensitive
   * @return will be null if no match is found
   */
  @JsonCreator
  public static ProjectStatusDto fromValue(String source) {
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
   * Returns {@link ProjectStatusDto} based on an id value.
   *
   * @param id id value of status.
   * @return will be null if no match is found
   */
  public static ProjectStatusDto fromId(int id) {

    for (final var value : values()) {
      if (value.getId() == id) {
        return value;
      }
    }
    return null;
  }
}
