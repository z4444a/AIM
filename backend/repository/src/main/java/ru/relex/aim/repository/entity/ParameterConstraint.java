package ru.relex.aim.repository.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.MapsId;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import java.time.LocalDate;
import java.util.Objects;

/**
 * Represents constraints that apply to a resource parameter.
 *
 * @author Nastya Zinchenko
 */
@Entity
@Table(name = "parameter_value_constraint", schema = "aim")
public class ParameterConstraint {

  @Id
  @Column(name = "parameter_id")
  private Integer id;

  @Column(name = "min_number_value")
  private Integer minNumberValue;

  @Column(name = "max_number_value")
  private Integer maxNumberValue;

  @Column(name = "min_date_value")
  private LocalDate minDateValue;

  @Column(name = "max_date_value")
  private LocalDate maxDateValue;

  @Column(name = "min_date_today")
  private boolean minDateToday;

  @Column(name = "max_date_today")
  private boolean maxDateToday;

  @Column(name = "max_string_length")
  private Integer maxStringLength;

  @Column(name = "min_real_value")
  private Float minRealValue;

  @Column(name = "max_real_value")
  private Float maxRealValue;

  @Column(name = "reg_exp")
  private String regExp;

  @Column(name = "multiple_max")
  private Integer multipleMax;

  @OneToOne
  @MapsId
  @JoinColumn(name = "parameter_id")
  private Parameter parameter;

  //region Getters and Getters
  public Integer getId() {
    return id;
  }

  public void setId(Integer id) {
    this.id = id;
  }

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

  public Parameter getParameter() {
    return parameter;
  }

  public void setParameter(Parameter parameter) {
    this.parameter = parameter;
  }

  public boolean isMinDateToday() {
    return minDateToday;
  }

  public void setMinDateToday(boolean minDateToday) {
    this.minDateToday = minDateToday;
  }

  public boolean isMaxDateToday() {
    return maxDateToday;
  }

  public void setMaxDateToday(boolean maxDateToday) {
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
  //endregion

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (!(o instanceof ParameterConstraint)) {
      return false;
    }
    final ParameterConstraint that = (ParameterConstraint) o;
    return minDateToday == that.minDateToday
        && maxDateToday == that.maxDateToday
        && Objects.equals(id, that.id)
        && Objects.equals(minNumberValue, that.minNumberValue)
        && Objects.equals(maxNumberValue, that.maxNumberValue)
        && Objects.equals(minDateValue, that.minDateValue)
        && Objects.equals(maxDateValue, that.maxDateValue)
        && Objects.equals(maxStringLength, that.maxStringLength)
        && Objects.equals(minRealValue, that.minRealValue)
        && Objects.equals(maxRealValue, that.maxRealValue)
        && Objects.equals(regExp, that.regExp)
        && Objects.equals(parameter.getId(), that.parameter.getId());
  }

  @Override
  public int hashCode() {
    final var parameterId = parameter == null ? null : parameter.getId();
    return Objects.hash(id, minNumberValue, maxNumberValue, minDateValue, maxDateValue,
        minDateToday, maxDateToday, maxStringLength, minRealValue, maxRealValue, regExp, parameterId);
  }
}
