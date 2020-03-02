package ru.relex.aim.repository.entity;

import java.util.Objects;

/**
 * Represents an information for requestParameterValue.
 *
 * @author Nastya Zinchenko
 */
public class GeneralParameterValue {

  private Integer id;
  private Object value;
  private Integer parameterType;

  public Integer getId() {
    return id;
  }

  public void setId(Integer id) {
    this.id = id;
  }

  public Object getValue() {
    return value;
  }

  public void setValue(Object value) {
    this.value = value;
  }

  public Integer getParameterType() {
    return parameterType;
  }

  public void setParameterType(Integer parameterType) {
    this.parameterType = parameterType;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (!(o instanceof GeneralParameterValue)) {
      return false;
    }
    final GeneralParameterValue that = (GeneralParameterValue) o;
    return Objects.equals(id, that.id)
        && Objects.equals(value, that.value)
        && Objects.equals(parameterType, that.parameterType);
  }

  @Override
  public int hashCode() {
    return Objects.hash(id, value, parameterType);
  }
}
