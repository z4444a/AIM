package ru.relex.aim.repository.entity;

/**
 * Represents a stage of request handling.
 *
 * @author Sorokin Georgy
 */
public enum RequestStatus {

  NEW(1, "Новая"),
  IN_PROGRESS(2, "В работе"),
  EXECUTED(3, "Исполнена"),
  CANCELED(4, "Отменена"),
  PAUSED(5, "Приостановлена");

  private final int id;
  private final String name;

  RequestStatus(int id, String name) {
    this.id = id;
    this.name = name;
  }

  public String getName() {
    return name;
  }

  public int getId() {
    return id;
  }

  /**
   * Tries to parse given id into {@link RequestStatus} instance.
   *
   * @param id id to find matching request status
   * @return request status with matching id or {@literal null}.
   */
  public static RequestStatus fromId(final int id) {
    for (final var value : values()) {
      if (value.id == id) {
        return value;
      }
    }
    return null;
  }
}
