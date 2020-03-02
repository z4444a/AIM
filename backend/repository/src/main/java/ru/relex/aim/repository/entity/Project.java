package ru.relex.aim.repository.entity;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import java.util.Objects;
import java.util.Set;


/**
 * Represents a project for which resources are allocated.
 *
 * @author Sorokin Georgy
 */
@Entity
@Table(name = "projects", schema = "aim")
public class Project {

  @Id
  @Column(name = "project_id")
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;

  @Column(nullable = false)
  private String name;

  @Column(name = "status_id")
  private ProjectStatus status;

  @ManyToMany(mappedBy = "projects")
  private Set<Employee> employees;

  //region Getters and Setters
  public Set<Employee> getEmployees() {
    return employees;
  }

  public Integer getId() {
    return id;
  }

  public void setId(Integer id) {
    this.id = id;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public ProjectStatus getStatus() {
    return status;
  }

  public void setStatus(ProjectStatus status) {
    this.status = status;
  }

  public void setEmployees(Set<Employee> employees) {
    this.employees = employees;
  }
  //endregion

  @Override
  public boolean equals(Object object) {
    if (this == object) {
      return true;
    }
    if (!(object instanceof Project)) {
      return false;
    }
    final Project project = (Project) object;
    return Objects.equals(id, project.id)
        && Objects.equals(name, project.name)
        && status == project.status;
  }

  @Override
  public int hashCode() {
    return Objects.hash(id, name, status);
  }
}
