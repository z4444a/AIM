package ru.relex.aim.security.config;

/**
 * Keeps error codes which must be processed on the client-side.
 *
 * @author Sorokin Georgy
 */
public final class ErrorResponseCode {

  public static final int BAD_ACCESS_TOKEN = 452;

  public static final int BAD_REFRESH_TOKEN = 453;

  private ErrorResponseCode(){
  }
}
