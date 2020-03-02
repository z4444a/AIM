package ru.relex.aim.security.intranet.model.exception;

/**
 * Keeps intranet error response.
 * @author Sorokin Georgy
 */
public class ErrorResponse {

  private ErrorValue error;

  public ErrorValue getError() {
    return error;
  }

  public void setError(ErrorValue error) {
    this.error = error;
  }

  /**
   * Error received from intranet.
   */
  public class ErrorValue {

    private Integer code;

    private Integer intranetCode;

    private String message;

    public Integer getCode() {
      return code;
    }

    public void setCode(Integer code) {
      this.code = code;
    }

    public Integer getIntranetCode() {
      return intranetCode;
    }

    public void setIntranetCode(Integer intranetCode) {
      this.intranetCode = intranetCode;
    }

    public String getMessage() {
      return message;
    }

    public void setMessage(String message) {
      this.message = message;
    }
  }
}
