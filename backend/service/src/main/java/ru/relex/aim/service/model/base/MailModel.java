package ru.relex.aim.service.model.base;

/**
 * Data class for sending letters.
 *
 * @author Nastya Zinchenko
 */
public class MailModel {

  private String message;
  private String email;
  private String mailType;
  private Boolean send;

  public String getMessage() {
    return message;
  }

  public void setMessage(String message) {
    this.message = message;
  }

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public String getMailType() {
    return mailType;
  }

  public void setMailType(String mailType) {
    this.mailType = mailType;
  }

  public Boolean getSend() {
    return send;
  }

  public void setSend(Boolean send) {
    this.send = send;
  }
}
