package ru.relex.aim.service.model.validator;

/**
 * Represents model for parameter constraint validation result.
 */
public class ParameterConstraintValidatorResult {
  private final Integer parameterId;
  private final String errorCode;
  private final boolean valid;

  private ParameterConstraintValidatorResult(Integer parameterId, String errorCode, boolean valid) {
    this.parameterId = parameterId;
    this.errorCode = errorCode;
    this.valid = valid;
  }

  public Integer getParameterId() {
    return parameterId;
  }

  public String getErrorCode() {
    return errorCode;
  }

  /**
   * Validation check result.
   *
   * @return validation check result
   */
  public boolean isValid() {
    return valid;
  }

  /**
   * Create validation success model.
   *
   * @return success validation result
   */
  public static ParameterConstraintValidatorResult success() {
    return new ParameterConstraintValidatorResult(null, null, true);
  }

  /**
   * Create validation failed model.
   *
   * @param parameterId parameter identifier that failed validation
   * @param errorCode   error code string
   * @return error validation result
   */
  public static ParameterConstraintValidatorResult failed(Integer parameterId, String errorCode) {
    return new ParameterConstraintValidatorResult(parameterId, errorCode, false);
  }
}
