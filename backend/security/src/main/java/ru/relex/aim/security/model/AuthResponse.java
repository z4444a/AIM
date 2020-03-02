package ru.relex.aim.security.model;

/**
 * Used as authentication response body.
 * Contains access-token and refresh-token.
 *
 * @author Sorokin Georgy
 */
public class AuthResponse {

  private final String accessToken;

  private final String refreshToken;

  /**
   * Constructor.
   * @param accessToken gives access to api
   * @param refreshToken is needed to retrieve access token
   */
  public AuthResponse(String accessToken, String refreshToken) {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
  }

  public String getAccessToken() {
    return accessToken;
  }

  public String getRefreshToken() {
    return refreshToken;
  }
}
