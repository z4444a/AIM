package ru.relex.aim.service.model;

/**
 *  Represents universal http response which contains only one boolean field.
 *  Gives response to check requests.
 */
public class CheckResponse {

  private final boolean check;

  /**
   * Constructor.
   */
  public CheckResponse(boolean check) {
    this.check = check;
  }

  public boolean isCheck() {
    return check;
  }
}
