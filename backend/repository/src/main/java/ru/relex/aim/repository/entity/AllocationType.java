package ru.relex.aim.repository.entity;

/**
 * Represents a stage of request handling.
 *
 * @author Sorokin Georgy
 */
public enum AllocationType {

  AUTOMATIC(1),
  SEMI_AUTOMATIC(2),
  MANUAL(3);


  private final int id;

  AllocationType(int id) {
    this.id = id;
  }

  public int getId() {
    return id;
  }

  /**
   * Tries to parse given id into {@link AllocationType} instance.
   *
   * @param id id to find matching allocation type
   * @return project status with matching id or {@literal null}.
   */
  public static AllocationType fromId(final int id) {
    for (final var value : values()) {
      if (value.id == id) {
        return value;
      }
    }
    return null;
  }
}
