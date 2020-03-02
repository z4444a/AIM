package ru.relex.aim.service.model.get;

import ru.relex.aim.repository.entity.RequestParameterValue;
import ru.relex.aim.service.model.base.ContentDto;

import java.time.LocalDate;
import java.util.Objects;

/**
 * DTO class for {@link RequestParameterValue}.
 */
public class RequestParameterValueGetDto {

  private Integer id;
  private Integer parameterId;
  private Integer numberValue;
  private String stringValue;
  private LocalDate dateValue;
  private ContentDto listValue;
  private Float realValue;
  private Integer order;

  public Integer getId() {
    return id;
  }

  public void setId(Integer id) {
    this.id = id;
  }

  public Integer getParameterId() {
    return parameterId;
  }

  public void setParameterId(Integer parameterId) {
    this.parameterId = parameterId;
  }

  public Integer getNumberValue() {
    return numberValue;
  }

  public void setNumberValue(Integer numberValue) {
    this.numberValue = numberValue;
  }

  public String getStringValue() {
    return stringValue;
  }

  public void setStringValue(String stringValue) {
    this.stringValue = stringValue;
  }

  public LocalDate getDateValue() {
    return dateValue;
  }

  public void setDateValue(LocalDate dateValue) {
    this.dateValue = dateValue;
  }

  public ContentDto getListValue() {
    return listValue;
  }

  public void setListValue(ContentDto listValue) {
    this.listValue = listValue;
  }

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

  @Override
  public boolean equals(Object object) {
    if (this == object) {
      return true;
    }
    if (!(object instanceof RequestParameterValueGetDto)) {
      return false;
    }
    final RequestParameterValueGetDto that = (RequestParameterValueGetDto) object;
    return Objects.equals(id, that.id)
        && Objects.equals(parameterId, that.parameterId)
        && Objects.equals(numberValue, that.numberValue)
        && Objects.equals(stringValue, that.stringValue)
        && Objects.equals(dateValue, that.dateValue)
        && Objects.equals(listValue, that.listValue)
        && Objects.equals(realValue, that.realValue)
        && Objects.equals(order, that.order);
  }

  @Override
  public int hashCode() {
    return Objects.hash(id, parameterId, numberValue, stringValue, dateValue, listValue, realValue, order);
  }
}
