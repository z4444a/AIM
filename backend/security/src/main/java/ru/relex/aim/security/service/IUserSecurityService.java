package ru.relex.aim.security.service;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import ru.relex.aim.security.model.AuthUser;

/**
 * Generates token by user id or login.
 *
 * @author Sorokin Georgy
 */
public interface IUserSecurityService {
  /**
   * Forms token.
   *
   * @param username is the user's authenticator
   * @return authentication token which contains user's authentication data
   * @throws UsernameNotFoundException if user has not been found in database.
   */
  Authentication getAuthentication(String username);

  /**
   * Receives {@link AuthUser} by employee id or by master login.
   *
   * @param id is the user's authenticator
   * @return {@link AuthUser} to form authentication response.
   */
  AuthUser findByUsername(String id);
}
