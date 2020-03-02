package ru.relex.aim.commons;

/**
 * Enumeration representing roles in the system.
 *
 * @author Nikita Skornyakov
 * @date 24.06.2019
 */
public enum Role {

  ADMIN(2, SystemRole.ADMIN, 3),
  POOL_CREATOR(3, SystemRole.POOL_CREATOR, 2),
  POOL_OWNER(4, SystemRole.POOL_OWNER, 1),
  USER(1, SystemRole.USER, 0);

  private final int id;
  private final String name;

  /**
   * More when more permissions.
   */
  private final int priority;

  Role(int id, String name, int priority) {
    this.id = id;
    this.name = name;
    this.priority = priority;
  }

  public int getId() {
    return id;
  }

  public String getName() {
    return name;
  }

  public int getPriority() {
    return priority;
  }

  /**
   * Tries to parse given id into {@link Role} instance.
   *
   * @param id id to find matching role
   * @return Role with matching id or {@literal null}.
   */
  public static Role fromId(final int id) {
    for (final var value : values()) {
      if (value.id == id) {
        return value;
      }
    }
    return null;
  }
}
