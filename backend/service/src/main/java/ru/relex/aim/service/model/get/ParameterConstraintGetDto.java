package ru.relex.aim.service.model.get;

import java.time.LocalDate;
import java.util.List;
import java.util.Objects;


/**
 * DTO transfer class for {@link ru.relex.aim.repository.entity.CategoryPicture}
 * Used for fetching information to client.
 *
 * @author Dmitriy Poshevelya
 */
public class ParameterConstraintGetDto {

  private Integer id;

  private Integer minNumberValue;

  private Integer maxNumberValue;

  private LocalDate minDateValue;

  private LocalDate maxDateValue;

  private Boolean minDateToday;

  private Boolean maxDateToday;

  private Integer maxStringLength;

  private Float minRealValue;

  private Float maxRealValue;

  private String regExp;

  private List<ListValueGetDto> listValues;

  private Integer multipleMax;

  //region Getters and Setters
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

  public List<ListValueGetDto> getListValues() {
    return listValues;
  }

  public void setListValues(List<ListValueGetDto> listValues) {
    this.listValues = listValues;
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

  //endregion

  @Override
  public boolean equals(Object object) {
    if (this == object) {
      return true;
    }
    if (!(object instanceof ParameterConstraintGetDto)) {
      return false;
    }
    final ParameterConstraintGetDto that = (ParameterConstraintGetDto) object;
    return Objects.equals(id, that.id)
        && Objects.equals(minNumberValue, that.minNumberValue)
        && Objects.equals(maxNumberValue, that.maxNumberValue)
        && Objects.equals(minDateValue, that.minDateValue)
        && Objects.equals(maxDateValue, that.maxDateValue)
        && Objects.equals(minDateToday, that.minDateToday)
        && Objects.equals(maxDateToday, that.maxDateToday)
        && Objects.equals(maxStringLength, that.maxStringLength)
        && Objects.equals(minRealValue, that.minRealValue)
        && Objects.equals(maxRealValue, that.maxRealValue)
        && Objects.equals(regExp, that.regExp)
        && Objects.equals(listValues, that.listValues);
  }

  @Override
  public int hashCode() {
    return Objects.hash(id, minNumberValue, maxNumberValue, minDateValue, maxDateValue, minDateToday,
        maxDateToday, maxStringLength, minRealValue, maxRealValue, regExp, listValues);
  }
}

