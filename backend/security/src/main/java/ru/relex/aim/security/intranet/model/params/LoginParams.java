package ru.relex.aim.security.intranet.model.params;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

/**
 * Keeps parameters used to log into the intranet.
 * @author Sorokin Georgy
 */
@JsonIgnoreProperties(ignoreUnknown = true)
public class LoginParams {

  private String login;

  private String password;

  /**
   * Constructor. All parameters are required.
   */
  public LoginParams(String login, String password) {
    this.login = login;
    this.password = password;
  }

  public String getLogin() {
    return login;
  }

  public void setLogin(String login) {
    this.login = login;
  }

  public String getPassword() {
    return password;
  }

  public void setPassword(String password) {
    this.password = password;
  }
}
