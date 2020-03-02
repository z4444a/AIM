package ru.relex.aim.security.ldap;

import org.springframework.boot.context.properties.ConfigurationProperties;

/**
 * Keeps properties for ldap authentication.
 *
 * @author Sorokin Georgy
 */
@ConfigurationProperties(prefix = "ldap")
public class LdapProperties {

  private String host;

  private String searchbase;

  private String password;

  private String userBase;

  private String initctx;

  public String getHost() {
    return host;
  }

  public void setHost(String host) {
    this.host = host;
  }

  public String getSearchbase() {
    return searchbase;
  }

  public void setSearchbase(String searchbase) {
    this.searchbase = searchbase;
  }

  public String getPassword() {
    return password;
  }

  public void setPassword(String password) {
    this.password = password;
  }

  public String getUserBase() {
    return userBase;
  }

  public void setUserBase(String userBase) {
    this.userBase = userBase;
  }

  public String getInitctx() {
    return initctx;
  }

  public void setInitctx(String initctx) {
    this.initctx = initctx;
  }
}
