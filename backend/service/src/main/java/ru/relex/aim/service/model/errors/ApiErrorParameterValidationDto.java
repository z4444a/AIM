package ru.relex.aim.service.model.errors;

/**
 * Parameter validation error DTO.
 */
public class ApiErrorParameterValidationDto extends ApiErrorBaseDto {
  private final Integer parameterId;

  /**
   * Constructor.
   *
   * @param parameterId parameter identifier that failed validation
   * @param errorCode error code string
   * @param errorMessage error message string
   */
  public ApiErrorParameterValidationDto(Integer parameterId, String errorCode, String errorMessage) {
    super(errorCode, errorMessage);
    this.parameterId = parameterId;
  }

  public Integer getParameterId() {
    return parameterId;
  }
}
