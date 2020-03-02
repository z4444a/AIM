package ru.relex.aim.security.intranet.model.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * Is thrown if intranet returns an error.
 * @author Sorokin Georgy
 */
@ResponseStatus(HttpStatus.FAILED_DEPENDENCY)
public class IntranetException extends RuntimeException {
  private static final long serialVersionUID = -6225168116925961269L;

  /**
   * Constructor. All parameters are required.
   */
  public IntranetException(String message) {
    super("Intranet: " + message);
  }

  /**
   * Constructor. All parameters are required.
   */
  public IntranetException(Exception cause) {
    super(cause);
  }
}
