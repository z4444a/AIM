package ru.relex.aim.security.intranet.model.result;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

/**
 * Keeps user received from intranet.
 * @author Sorokin Georgy
 */
@JsonIgnoreProperties(ignoreUnknown = true)
public class User {

  private Integer id;

  private String firstName;

  private String middleName;

  private String lastName;

  private String position;

  public Integer getId() {
    return id;
  }

  public void setId(Integer id) {
    this.id = id;
  }

  public String getFirstName() {
    return firstName;
  }

  public void setFirstName(String firstName) {
    this.firstName = firstName;
  }

  public String getMiddleName() {
    return middleName;
  }

  public void setMiddleName(String middleName) {
    this.middleName = middleName;
  }

  public String getLastName() {
    return lastName;
  }

  public void setLastName(String lastName) {
    this.lastName = lastName;
  }

  public String getPosition() {
    return position;
  }

  public void setPosition(String position) {
    this.position = position;
  }

}
