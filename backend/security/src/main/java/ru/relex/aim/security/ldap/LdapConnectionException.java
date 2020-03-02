package ru.relex.aim.security.ldap;

/**
 *  Thrown if LDAP connection failed.
 */
public class LdapConnectionException extends RuntimeException {
  private static final long serialVersionUID = -5234210999964271186L;

  /**
   * Constructor.
   */
  public LdapConnectionException(Throwable cause) {
    super(cause);
  }
}
