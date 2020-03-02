package ru.relex.aim.service.model.get;

import ru.relex.aim.commons.Role;
import ru.relex.aim.service.model.base.NamedDto;

import java.util.Objects;


/**
 * DTO class for {@link ru.relex.aim.repository.entity.Employee}
 * Used for fetching information to client.
 *
 * @author Alexey Alimov
 */
public class EmployeeGetDto extends NamedDto implements Comparable<EmployeeGetDto> {

  private String lastName;
  private String firstName;
  private String middleName;
  private String post;

  private Role role;

  /**
   * Override method compareTo for our class EmployeeGetDto.
   */
  @Override
  public int compareTo(EmployeeGetDto dto) {
    return this.getFullName().compareTo(dto.getFullName());
  }

  //region Getters and Setters
  public String getLastName() {
    return lastName;
  }

  public void setLastName(String lastName) {
    this.lastName = lastName;
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

  public String getPost() {
    return post;
  }

  public void setPost(String post) {
    this.post = post;
  }

  public Role getRole() {
    return role;
  }

  public void setRole(Role role) {
    this.role = role;
  }

  /**
   * Returns full name of dto (last name + first name).
   */
  public String getFullName() {
    return this.lastName + ' ' + this.firstName;
  }
  //endregion

  @Override
  public boolean equals(Object object) {
    if (this == object) {
      return true;
    }
    if (!(object instanceof EmployeeGetDto)) {
      return false;
    }
    final EmployeeGetDto that = (EmployeeGetDto) object;
    return Objects.equals(lastName, that.lastName)
        && Objects.equals(firstName, that.firstName)
        && Objects.equals(middleName, that.middleName)
        && Objects.equals(post, that.post)
        && role == that.role;
  }

  @Override
  public int hashCode() {
    return Objects.hash(lastName, firstName, middleName, post, role);
  }
}
