package ru.relex.aim.repository.entity;

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
 * Represents a resource parameter value.
 */
@Entity
@Table(name = "parameter_value", schema = "aim")
public class RequestParameterValue implements IParameterValue {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "parameter_value_id")
  private Integer id;

  @ManyToOne
  @JoinColumn(name = "request_id")
  private Request request;

  @ManyToOne
  @JoinColumn(name = "parameter_id")
  private Parameter parameter;

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

  public Integer getId() {
    return id;
  }

  public void setId(Integer id) {
    this.id = id;
  }

  public Request getRequest() {
    return request;
  }

  public void setRequest(Request request) {
    this.request = request;
  }

  @Override
  public Parameter getParameter() {
    return parameter;
  }

  public void setParameter(Parameter parameter) {
    this.parameter = parameter;
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
      default:
        return "";
    }
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (!(o instanceof RequestParameterValue)) {
      return false;
    }
    final RequestParameterValue that = (RequestParameterValue) o;
    return Objects.equals(id, that.id)
        && Objects.equals(request.getId(), that.request.getId())
        && Objects.equals(parameter.getId(), that.parameter.getId())
        && Objects.equals(numberValue, that.numberValue)
        && Objects.equals(stringValue, that.stringValue)
        && Objects.equals(dateValue, that.dateValue)
        && Objects.equals(realValue, that.realValue)
        && Objects.equals(listValue, that.listValue);
  }

  @Override
  public int hashCode() {
    final var requestId = request == null ? null : request.getId();
    final var parameterId = parameter == null ? null : parameter.getId();
    return Objects.hash(id, requestId, parameterId, numberValue, stringValue, dateValue, realValue, listValue);
  }
}
