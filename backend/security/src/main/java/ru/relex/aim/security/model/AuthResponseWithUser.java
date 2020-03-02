package ru.relex.aim.security.model;

/**
 * Keeps data to authentication response.
 * @author Sorokin Georgy
 */
public class AuthResponseWithUser extends AuthResponse {
  private final AuthUser user;

  /**
   * Constructor.
   * @param response contains tokens
   * @param user current user
   */
  public AuthResponseWithUser(AuthResponse response, AuthUser user) {
    super(response.getAccessToken(), response.getRefreshToken());
    this.user = user;
  }

  public AuthUser getUser() {
    return user;
  }
}
