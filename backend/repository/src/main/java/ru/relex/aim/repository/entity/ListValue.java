package ru.relex.aim.repository.entity;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import java.util.Objects;

/**
 * Represents a value in a list of allowed values of a parameter.
 *
 * @author Alexey Alimov
 */
@Entity
@Table(name = "list_values", schema = "aim")
public class ListValue {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "list_value_id")
  private Integer id;

  @ManyToOne
  @JoinColumn(name = "parameter_id", nullable = false)
  private Parameter parameter;

  private String content;

  @Column(name = "\"order\"", nullable = false)
  private Integer order;

  //region Getters and Setters
  public Integer getId() {
    return id;
  }

  public void setId(Integer id) {
    this.id = id;
  }

  public Parameter getParameter() {
    return parameter;
  }

  public void setParameter(Parameter parameter) {
    this.parameter = parameter;
  }

  public String getContent() {
    return content;
  }

  public void setContent(String content) {
    this.content = content;
  }

  public Integer getOrder() {
    return order;
  }

  public void setOrder(Integer order) {
    this.order = order;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (!(o instanceof ListValue)) {
      return false;
    }
    final ListValue listValue = (ListValue) o;
    return Objects.equals(id, listValue.id)
        && Objects.equals(parameter.getId(), listValue.parameter.getId())
        && Objects.equals(content, listValue.content)
        && Objects.equals(order, listValue.order);
  }

  @Override
  public int hashCode() {
    final var parameterId = parameter == null ? null : parameter.getId();
    return Objects.hash(id, parameterId, content, order);
  }
  //endregion
}
