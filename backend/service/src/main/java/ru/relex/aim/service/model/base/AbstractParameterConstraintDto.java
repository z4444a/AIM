package ru.relex.aim.service.model.base;

import static ru.relex.aim.service.validation.code.ConstraintCode.*;
import static ru.relex.aim.service.validation.code.ParameterCode.*;

import java.time.LocalDate;
import java.util.List;
import javax.validation.constraints.Min;

import ru.relex.aim.service.validation.annotation.DateFrame;
import ru.relex.aim.service.validation.annotation.HasRegexSyntax;
import ru.relex.aim.service.validation.annotation.NumberRange;
import ru.relex.aim.service.validation.annotation.RealNumberRange;

/**
 * Dto class for {@link ru.relex.aim.repository.entity.ParameterConstraint}.
 * Holds information shared between update and create DTOs.
 */
@DateFrame(message = DATE_FRAME + PARAM_CONSTR)
@NumberRange(message = NUMBER_RANGE + PARAM_CONSTR)
@RealNumberRange(message = NUMBER_RANGE + PARAM_CONSTR)
public abstract class AbstractParameterConstraintDto {

  private Integer minNumberValue;

  private Integer maxNumberValue;

  private LocalDate minDateValue;

  private LocalDate maxDateValue;

  private Boolean minDateToday;

  private Boolean maxDateToday;

  private Float minRealValue;

  private Float maxRealValue;

  @HasRegexSyntax(message = REGEX_MISMATCH + PARAM_CONSTR_MAX_STR)
  private String regExp;

  @Min(value = 1, message = MIN + PARAM_CONSTR_MAX_STR)
  private Integer maxStringLength;

  //TODO: add validation [1,50]
  private Integer multipleMax;

  /**
   * Returns a list of {@link ru.relex.aim.repository.entity.ListValue} DTOs.
   * Implement this with implementation of {@link AbstractListValueDto}
   * as return value.
   */
  public abstract List<? extends AbstractListValueDto> getListValues();

  public Integer getMinNumberValue() {
    return minNumberValue;
  }

  public void setMinNumberValue(Integer minNumberValue) {
    this.minNumberValue = minNumberValue;
  }

  public Integer getMaxNumberValue() {
    return maxNumberValue;
  }

  public void setMaxNumberValue(Integer maxNumberValue) {
    this.maxNumberValue = maxNumberValue;
  }

  public LocalDate getMinDateValue() {
    return minDateValue;
  }

  public void setMinDateValue(LocalDate minDateValue) {
    this.minDateValue = minDateValue;
  }

  public LocalDate getMaxDateValue() {
    return maxDateValue;
  }

  public void setMaxDateValue(LocalDate maxDateValue) {
    this.maxDateValue = maxDateValue;
  }

  public Integer getMaxStringLength() {
    return maxStringLength;
  }

  public void setMaxStringLength(Integer maxStringLength) {
    this.maxStringLength = maxStringLength;
  }

  public Float getMinRealValue() {
    return minRealValue;
  }

  public void setMinRealValue(Float minRealValue) {
    this.minRealValue = minRealValue;
  }

  public Float getMaxRealValue() {
    return maxRealValue;
  }

  public void setMaxRealValue(Float maxRealValue) {
    this.maxRealValue = maxRealValue;
  }

  public Boolean getMinDateToday() {
    return minDateToday;
  }

  public void setMinDateToday(Boolean minDateToday) {
    this.minDateToday = minDateToday;
  }

  public Boolean getMaxDateToday() {
    return maxDateToday;
  }

  public void setMaxDateToday(Boolean maxDateToday) {
    this.maxDateToday = maxDateToday;
  }

  public String getRegExp() {
    return regExp;
  }

  public void setRegExp(String regExp) {
    this.regExp = regExp;
  }

  public Integer getMultipleMax() {
    return multipleMax;
  }

  public void setMultipleMax(Integer multipleMax) {
    this.multipleMax = multipleMax;
  }
}
