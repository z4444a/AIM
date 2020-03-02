package ru.relex.aim.security.service;

import ru.relex.aim.security.model.AuthUser;

/**
 * Service responsible for post-processing login requests, such as tracking statistics, auditing or
 * synchronizing data.
 *
 * @author Nikita Skornyakov
 * @date 19.07.2019
 */
public interface IPostLoginHandler {

  /**
   * Fires when user logs into the system.
   *
   * @param user user who successfully performed authentication
   */
  void userLoggedIn(AuthUser user);

}
