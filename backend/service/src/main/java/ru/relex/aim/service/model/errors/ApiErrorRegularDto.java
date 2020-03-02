package ru.relex.aim.service.model.errors;

/**
 * Regular error DTO.
 */
public class ApiErrorRegularDto extends ApiErrorBaseDto {

  /**
   * Constructor.
   *
   * @param errorCode error code string
   * @param errorMessage error code string
   */
  public ApiErrorRegularDto(String errorCode, String errorMessage) {
    super(errorCode, errorMessage);
  }
}
