package ru.relex.aim.repository.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import java.util.Objects;
import java.util.Set;

/**
 * Represents a resource parameter type.
 *
 * @author Nastya Zinchenko
 */
@Entity
@Table(name = "parameter_types", schema = "aim")
public class ParameterType {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "parameter_type_id")
  private Integer id;

  @Column(name = "name", nullable = false)
  private String name;

  //region Getters and Setters
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
  //endregion

  @Override
  public boolean equals(Object object) {
    if (this == object) {
      return true;
    }
    if (!(object instanceof ParameterType)) {
      return false;
    }
    final ParameterType that = (ParameterType) object;
    return Objects.equals(id, that.id)
        && Objects.equals(name, that.name);
  }

  @Override
  public int hashCode() {
    return Objects.hash(id, name);
  }
}
