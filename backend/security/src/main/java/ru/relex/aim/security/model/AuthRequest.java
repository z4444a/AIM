package ru.relex.aim.security.model;

/**
 * Used as authentication request body.
 * Contains login and password.
 *
 * @author Sorokin Georgy
 */
public class AuthRequest {

  private String login;
  private char[] password;

  public String getLogin() {
    return login;
  }

  public void setLogin(String login) {
    this.login = login;
  }

  public char[] getPassword() {
    return password.clone();
  }

  public void setPassword(char[] password) {
    this.password = password.clone();
  }
}
