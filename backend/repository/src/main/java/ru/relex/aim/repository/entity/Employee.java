package ru.relex.aim.repository.entity;

import java.util.Objects;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.Stream;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

import ru.relex.aim.commons.Role;

/**
 * Represents an application user.
 *
 * @author Sorokin Georgy
 */
@Entity
@Table(name = "employees", schema = "aim")
public class Employee {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "employee_id")
  private Integer id;

  @Column(nullable = false)
  private String username;

  @Column
  private String lastName;

  @Column
  private String firstName;

  @Column
  private String middleName;

  @Column(name = "synchronized")
  private boolean synced;

  @Column
  private String post;

  @Column(name = "role_id")
  private Role role;

  @ManyToMany
  @JoinTable(
      schema = "aim",
      name = "employees_projects",
      joinColumns = @JoinColumn(name = "employee_id"),
      inverseJoinColumns = @JoinColumn(name = "project_id")
  )
  private Set<Project> projects;

  @ManyToMany(mappedBy = "owners")
  private Set<ResourcePool> resourcePools;

  //region Getters and Setters
  public Integer getId() {
    return id;
  }

  public void setId(Integer id) {
    this.id = id;
  }

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

  public Set<ResourcePool> getResourcePools() {
    return resourcePools;
  }

  public Set<Project> getProjects() {
    return projects;
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

  public void setProjects(Set<Project> projects) {
    this.projects = projects;
  }

  public void setResourcePools(Set<ResourcePool> resourcePools) {
    this.resourcePools = resourcePools;
  }

  public void setRole(Role role) {
    this.role = role;
  }

  /**
   * Returns full name of employee (last name + first name).
   */
  public String getFullName() {
    return Stream
        .of(lastName, firstName, middleName)
        .filter(Objects::nonNull)
        .collect(Collectors.joining(" "));
  }

  public String getUsername() {
    return username;
  }

  public void setUsername(String username) {
    this.username = username;
  }

  public boolean isSynced() {
    return synced;
  }

  public void setSynced(boolean synced) {
    this.synced = synced;
  }

  //endregion


  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (!(o instanceof Employee)) {
      return false;
    }
    final Employee employee = (Employee) o;
    return synced == employee.synced
        && Objects.equals(id, employee.id)
        && Objects.equals(username, employee.username)
        && Objects.equals(lastName, employee.lastName)
        && Objects.equals(firstName, employee.firstName)
        && Objects.equals(middleName, employee.middleName)
        && Objects.equals(post, employee.post)
        && role == employee.role;
  }

  @Override
  public int hashCode() {
    return Objects.hash(id, username, lastName, firstName, middleName, synced, post, role);
  }
}
