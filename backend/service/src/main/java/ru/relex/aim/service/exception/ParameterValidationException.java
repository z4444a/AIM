package ru.relex.aim.service.exception;

import org.springframework.http.HttpStatus;

/**
 * Service parameter validation error.
 */
public class ParameterValidationException extends ServiceException {
  private static final long serialVersionUID = 4134538999207616034L;
  private final Integer parameterId;
  private final String errorCode;

  /**
   * Constructor.
   *
   * @param message     error message
   * @param status      http error code
   * @param parameterId parameter identifier that failed validation
   * @param errorCode   error code
   */
  public ParameterValidationException(String message, HttpStatus status, Integer parameterId, String errorCode) {
    super(message, status);
    this.parameterId = parameterId;
    this.errorCode = errorCode;
  }

  /**
   * Constructor.
   *
   * @param parameterId parameter identifier that failed validation
   * @param errorCode   error code
   */
  public ParameterValidationException(Integer parameterId, String errorCode) {
    super("Resource type parameter validation error", HttpStatus.BAD_REQUEST);
    this.parameterId = parameterId;
    this.errorCode = errorCode;
  }

  public Integer getParameterId() {
    return parameterId;
  }

  public String getErrorCode() {
    return errorCode;
  }
}
