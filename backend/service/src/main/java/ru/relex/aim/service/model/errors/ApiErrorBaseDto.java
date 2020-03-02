package ru.relex.aim.service.model.errors;

/**
 * Basic class for server error.
 */
public class ApiErrorBaseDto {
  private final String errorCode;
  private final String errorMessage;

  /**
   * Constructor.
   *
   * @param errorCode error code string
   * @param errorMessage error message string
   */
  public ApiErrorBaseDto(String errorCode, String errorMessage) {
    this.errorCode = errorCode;
    this.errorMessage = errorMessage;
  }

  public String getErrorCode() {
    return errorCode;
  }

  public String getErrorMessage() {
    return errorMessage;
  }
}
