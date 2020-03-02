package ru.relex.aim.service.model.errors;

import java.util.Collections;
import java.util.List;

/**
 * Represents basic class for server response when exception is thrown.
 *
 * @param <T> specific error type
 */
public class ApiErrorDto<T> {

  /**
   * Server error types.
   */
  public enum ErrorType {
    PARAMETER_VALIDATION, FIELD_VALIDATION, REGULAR
  }

  private final ErrorType type;
  private final List<T> errors;

  /**
   * Constructor.
   *
   * @param type   error type value {@link ErrorType}
   * @param errors list of errors
   */
  private ApiErrorDto(ErrorType type, List<T> errors) {
    this.type = type;
    this.errors = errors;
  }

  public ErrorType getType() {
    return type;
  }

  public List<T> getErrors() {
    return errors;
  }

  /**
   * Builder for regular error {@link ApiErrorRegularDto}.
   *
   * @param errorCode    error code string
   * @param errorMessage error message string
   * @return error dto object
   */
  public static ApiErrorDto<ApiErrorRegularDto> regularError(String errorCode,
                                                             String errorMessage) {
    return new ApiErrorDto(ErrorType.REGULAR,
        Collections.singletonList(new ApiErrorRegularDto(errorCode, errorMessage)));
  }

  /**
   * Builder for field validation error {@link ApiErrorFieldValidationDto}.
   *
   * @param errors list of errors
   * @return error dto object
   */
  public static ApiErrorDto<ApiErrorFieldValidationDto> fieldValidationError(
      List<ApiErrorFieldValidationDto> errors) {
    return new ApiErrorDto(ErrorType.FIELD_VALIDATION, errors);
  }

  /**
   * Builder for field validation error {@link ApiErrorParameterValidationDto}.
   *
   * @param parameterId  parameter identifier that failed validation
   * @param errorCode    error code string
   * @param errorMessage error message string
   * @return error dto object
   */
  public static ApiErrorDto<ApiErrorParameterValidationDto> parameterValidationError(Integer parameterId,
                                                                                     String errorCode,
                                                                                     String errorMessage) {
    return new ApiErrorDto(
        ErrorType.PARAMETER_VALIDATION,
        List.of(new ApiErrorParameterValidationDto(parameterId, errorCode, errorMessage)));
  }
}
