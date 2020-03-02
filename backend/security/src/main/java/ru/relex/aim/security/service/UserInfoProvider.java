package ru.relex.aim.security.service;

import ru.relex.aim.security.model.Details;

/**
 * Provider of current system user login.
 */
public interface UserInfoProvider {
  /**
   * Returns {@link Details} with current system user login.
   *
   * @return {@link Details} with current system user login
   */
  Details getCurrentUserDetail();

  /**
   * Is the user admin.
   *
   * @return current user is admin
   */
  boolean isAdmin();
}
