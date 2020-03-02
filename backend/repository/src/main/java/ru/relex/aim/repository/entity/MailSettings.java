package ru.relex.aim.repository.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.Objects;

/**
 * Represents a mail settings.
 *
 * @author Nastya Zinchenko
 */
@Entity
@Table(name = "mail_settings", schema = "aim")
public class MailSettings {

  @Id
  @Column(name = "key")
  private String key;

  @Column(name = "value")
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

  @Override
  public boolean equals(Object object) {
    if (this == object) {
      return true;
    }
    if (!(object instanceof MailSettings)) {
      return false;
    }
    final MailSettings that = (MailSettings) object;
    return Objects.equals(key, that.key)
        && Objects.equals(value, that.value);
  }

  @Override
  public int hashCode() {
    return Objects.hash(key, value);
  }
}
