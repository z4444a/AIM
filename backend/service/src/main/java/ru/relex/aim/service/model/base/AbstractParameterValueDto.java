package ru.relex.aim.service.model.base;

import ru.relex.aim.commons.EntityType;
import ru.relex.aim.service.model.create.PoolParameterValueCreateDto;
import ru.relex.aim.service.model.update.PoolParameterValueUpdateDto;
import ru.relex.aim.service.validation.annotation.EntityExists;
import ru.relex.aim.service.validation.annotation.SatisfiesValues;

import javax.validation.constraints.NotNull;
import java.time.LocalDate;

import static ru.relex.aim.service.validation.code.ConstraintCode.*;
import static ru.relex.aim.service.validation.code.ParameterCode.*;

/**
 * Base data class for {@link PoolParameterValueCreateDto}
 * and {@link PoolParameterValueUpdateDto}.
 *
 * @author Nastya Zinchenko
 */
@SatisfiesValues(message = INVALID_VALUES + PARAMETER_VALUE)
public abstract class AbstractParameterValueDto {

  @NotNull(message = NOT_NULL + PARAMETER_ID)
  @EntityExists(message = ENTITY_EXISTS + PARAMETER, entityType = EntityType.PARAMETER)
  private Integer parameterId;
  private Integer numberValue;
  private String stringValue;
  private LocalDate dateValue;
  private Float realValue;
  private BaseDto listValue;
  private Integer order;

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

  public BaseDto getListValue() {
    return listValue;
  }

  public void setListValue(BaseDto listValue) {
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
}
