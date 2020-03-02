package ru.relex.aim.service.model.base;

/**
 * Dto for mailing settings.
 *
 * @author Nastya Zinchenko
 */
public class MailSettingsDto {

  private String key;
  private String value;

  public String getKey() {
    return key;
  }

  public void setKey(String key) {
    this.key = key;
  }

  public String getValue() {
    return value;
  }

  public void setValue(String value) {
    this.value = value;
  }
}
