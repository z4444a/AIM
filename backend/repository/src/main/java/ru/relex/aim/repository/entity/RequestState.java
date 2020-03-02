package ru.relex.aim.repository.entity;

/**
 * Represents state of resource for which request is made.
 *
 * @author Sorokin Georgy
 */
public enum RequestState {

  ACTIVE(1),
  INACTIVE(2),
  UNMONITORED(3);


  private final int id;

  RequestState(int id) {
    this.id = id;
  }

  public int getId() {
    return id;
  }

  /**
   * Tries to parse given id into {@link RequestState} instance.
   *
   * @param id id to find matching request state
   * @return request state with matching id or {@literal null}.
   */
  public static RequestState fromId(final int id) {
    for (final var value : values()) {
      if (value.id == id) {
        return value;
      }
    }
    return null;
  }
}
