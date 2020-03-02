package ru.relex.aim.service.exception;

import org.springframework.http.HttpStatus;

/**
 * Generalized service error.
 */
public class ServiceException extends RuntimeException {
  private static final long serialVersionUID = 2298863289583923744L;
  private final HttpStatus status;

  /**
   * Constructor.
   *
   * @param message error message
   * @param status  http error code
   */
  public ServiceException(String message, HttpStatus status) {
    super(message);
    this.status = status;
  }

  /**
   * Constructor.
   *
   * @param message error message
   * @param cause   {@link  Throwable} object
   * @param status  http error code
   */
  public ServiceException(String message, Throwable cause, HttpStatus status) {
    super(message, cause);
    this.status = status;
  }

  public HttpStatus getStatus() {
    return status;
  }
}

