package ru.relex.aim.repository.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import java.util.Arrays;
import java.util.Objects;

/**
 * Represents the first user, who always has admin rights.
 *
 * @author Sorokin Georgy
 */
@Entity
@Table(name = "master", schema = "aim")
public class Master {
  @Id
  private String login;

  @Column(name = "password", columnDefinition = "bpchar")
  private char[] password;

  @OneToOne
  @JoinColumn(name = "employee_id", nullable = false)
  private Employee employee;

  private Boolean active;

  public String getLogin() {
    return login;
  }

  public void setLogin(String login) {
    this.login = login;
  }

  public char[] getPassword() {
    return password.clone();
  }

  public void setPassword(char[] password) {
    this.password = password.clone();
  }

  public Boolean getActive() {
    return active;
  }

  public void setActive(Boolean active) {
    this.active = active;
  }

  public Employee getEmployee() {
    return employee;
  }

  public void setEmployee(Employee employee) {
    this.employee = employee;
  }

  @Override
  public boolean equals(Object object) {
    if (this == object) {
      return true;
    }
    if (!(object instanceof Master)) {
      return false;
    }
    final Master master = (Master) object;
    return Objects.equals(login, master.login)
        && Arrays.equals(password, master.password)
        && Objects.equals(employee.getId(), master.employee.getId())
        && Objects.equals(active, master.active);
  }

  @Override
  public int hashCode() {
    final var employeeId = employee == null ? null : employee.getId();
    int result = Objects.hash(login, employeeId, active);
    result = 31 * result + Arrays.hashCode(password);
    return result;
  }
}
