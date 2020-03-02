package ru.relex.aim.service.model;

import ru.relex.aim.commons.Role;

/**
 * Represents current user profile.
 *
 * @author Nikita Skornyakov
 * @date 22.07.2019
 */
public class UserProfileDto {

  private int id;
  private Role role;
  private String username;
  private String firstName;
  private String lastName;
  private String middleName;

  //region Getters and Setters
  public int getId() {
    return id;
  }

  public void setId(int id) {
    this.id = id;
  }

  public Role getRole() {
    return role;
  }

  public void setRole(Role role) {
    this.role = role;
  }

  public String getUsername() {
    return username;
  }

  public void setUsername(String username) {
    this.username = username;
  }

  public String getFirstName() {
    return firstName;
  }

  public void setFirstName(String firstName) {
    this.firstName = firstName;
  }

  public String getLastName() {
    return lastName;
  }

  public void setLastName(String lastName) {
    this.lastName = lastName;
  }

  public String getMiddleName() {
    return middleName;
  }

  public void setMiddleName(String middleName) {
    this.middleName = middleName;
  }
  //endregion
}
