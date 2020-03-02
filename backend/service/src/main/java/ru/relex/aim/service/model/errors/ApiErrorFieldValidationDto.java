package ru.relex.aim.service.model.errors;

/**
 * Field validation error DTO.
 */
public class ApiErrorFieldValidationDto extends ApiErrorBaseDto {

  /**
   * Constructor.
   *
   * @param errorCode error code string
   * @param errorMessage error message string
   */
  public ApiErrorFieldValidationDto(String errorCode, String errorMessage) {
    super(errorCode, errorMessage);
  }

  /**
   * Constructor.
   *
   * @param errorCode error code string
   */
  public ApiErrorFieldValidationDto(String errorCode) {
    super(errorCode, "Field validation error");
  }
}
