package ru.relex.aim.security.service;

import ru.relex.aim.security.model.AuthRequest;

/**
 * Gives access to {@link ru.relex.aim.repository.repository.MasterRepository}.
 * It counts and saves registered users.
 *
 * @author Sorokin Georgy
 */
public interface IMasterService {

  /**
   * Creates the first user using repository.
   * Parameter is required.
   *
   * @param authRequest contains login and password of the new user.
   * @return the first user's login if user has been saved.
   */
  String createMaster(AuthRequest authRequest);

  /**
   * Creates the first user using repository if it already exists in the LDAP.
   * Parameter is required.
   *
   * @param userId id of the user in the existing system.
   * @return the first user's login if user has been saved.
   */
  String createMaster(int userId);

  /**
   * Counts users.
   *
   * @return count of users
   */
  long countMasters();
}
