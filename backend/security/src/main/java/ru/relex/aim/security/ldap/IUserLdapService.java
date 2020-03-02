package ru.relex.aim.security.ldap;

import ru.relex.aim.security.model.AuthUser;

/**
 * Service intended to synchronize user data with LDAP.
 *
 * @author Nikita Skornyakov
 * @date 22.07.2019
 */
public interface IUserLdapService {

  /**
   * Synchronizes user by username with LDAP data.
   */
  AuthUser synchronizeUser(String username);

}
