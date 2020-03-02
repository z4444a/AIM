package ru.relex.aim.repository.entity;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import java.time.LocalDate;
import java.util.Objects;

/**
 * Represents specified parameter value for a specific pool.
 *
 * @author Nastya Zinchenko
 */
@Entity
@Table(name = "pool_parameter_values", schema = "aim")
public class PoolParameterValue implements IParameterValue {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY, generator = "PARAMETER_VALUE_SEQ")
  @GenericGenerator(name = "PARAMETER_VALUE_SEQ", strategy = "sequence-identity",
      parameters = @org.hibernate.annotations.Parameter(name = "sequence", value = "aim.pool_parameter_value_seq"))
  @Column(name = "parameter_value_id")
  private Integer id;

  @ManyToOne
  @JoinColumn(name = "parameter_id")
  private Parameter parameter;

  @ManyToOne
  @JoinColumn(name = "pool_id")
  private ResourcePool pool;

  @Column(name = "number_value")
  private Integer numberValue;

  @Column(name = "string_value")
  private String stringValue;

  @Column(name = "date_value")
  private LocalDate dateValue;

  @Column(name = "real_value")
  private Float realValue;

  @Column(name = "\"order\"", nullable = false)
  private Integer order;

  @ManyToOne
  @JoinColumn(name = "list_value_id")
  private ListValue listValue;

  @ManyToOne
  @JoinColumn(name = "parameter_pool_id")
  private ResourcePool parameterPool;

  public Integer getId() {
    return id;
  }

  public void setId(Integer id) {
    this.id = id;
  }

  @Override
  public Parameter getParameter() {
    return parameter;
  }

  public void setParameter(Parameter parameter) {
    this.parameter = parameter;
  }

  public ResourcePool getPool() {
    return pool;
  }

  public void setPool(ResourcePool pool) {
    this.pool = pool;
  }

  @Override
  public Integer getNumberValue() {
    return numberValue;
  }

  public void setNumberValue(Integer numberValue) {
    this.numberValue = numberValue;
  }

  @Override
  public String getStringValue() {
    return stringValue;
  }

  public void setStringValue(String stringValue) {
    this.stringValue = stringValue;
  }

  @Override
  public LocalDate getDateValue() {
    return dateValue;
  }

  public void setDateValue(LocalDate dateValue) {
    this.dateValue = dateValue;
  }

  @Override
  public ListValue getListValue() {
    return listValue;
  }

  public void setListValue(ListValue listValue) {
    this.listValue = listValue;
  }

  @Override
  public Float getRealValue() {
    return realValue;
  }

  public void setRealValue(Float realValue) {
    this.realValue = realValue;
  }

  public Integer getOrder() {
    return order;
  }

  public void setOrder(Integer order) {
    this.order = order;
  }

  public ResourcePool getParameterPool() {
    return parameterPool;
  }

  public void setParameterPool(ResourcePool parameterPool) {
    this.parameterPool = parameterPool;
  }

  /**
   * Returns content of parameter value.
   *
   * @return this parameter value as string
   */
  public String getValueAsString() {
    if (parameter == null || parameter.getParameterType() == null) {
      return "";
    }
    switch (ru.relex.aim.commons.ParameterType.getValue(parameter.getParameterType().getId())) {
      case TEXT:
        return stringValue;
      case NUMBER:
        return numberValue.toString();
      case REAL:
        return realValue.toString();
      case DATE:
        return dateValue.toString();
      case LIST:
        return listValue.getContent();
      case POOL:
        return parameterPool.getName();
      default:
        return "";
    }
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (!(o instanceof PoolParameterValue)) {
      return false;
    }
    final PoolParameterValue that = (PoolParameterValue) o;
    return Objects.equals(id, that.id)
        && Objects.equals(parameter.getId(), that.parameter.getId())
        && Objects.equals(pool.getId(), that.pool.getId())
        && Objects.equals(numberValue, that.numberValue)
        && Objects.equals(stringValue, that.stringValue)
        && Objects.equals(dateValue, that.dateValue)
        && Objects.equals(realValue, that.realValue)
        && Objects.equals(listValue, that.listValue)
        && Objects.equals(order, that.order);
  }

  @Override
  public int hashCode() {
    final var parameterId = parameter == null ? null : parameter.getId();
    final var poolId = pool == null ? null : pool.getId();
    return Objects.hash(id, parameterId, poolId, numberValue, stringValue, dateValue, realValue, listValue, order);
  }
}
