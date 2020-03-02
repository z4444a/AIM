package ru.relex.aim.repository.entity;

/**
 * Represents a project status.
 *
 * @author Sorokin Georgy
 */
public enum ProjectStatus {

  IN_PROGRESS(1),
  FINISHED(2);


  private final int id;

  ProjectStatus(int id) {
    this.id = id;
  }

  public int getId() {
    return id;
  }

  /**
   * Tries to parse given id into {@link ProjectStatus} instance.
   *
   * @param id id to find matching project status
   * @return project status with matching id or {@literal null}.
   */
  public static ProjectStatus fromId(final int id) {
    for (final var value : values()) {
      if (value.id == id) {
        return value;
      }
    }
    return null;
  }
}
