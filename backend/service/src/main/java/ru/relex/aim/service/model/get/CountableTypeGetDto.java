package ru.relex.aim.service.model.get;

import ru.relex.aim.service.model.base.NamedDto;

import java.util.Objects;

/**
 * DTO class for {@link ru.relex.aim.commons.ParameterType}.
 * Contains the quantitative flag field.
 */
public class CountableTypeGetDto extends NamedDto {
  private Boolean quantitative;

  public Boolean getQuantitative() {
    return quantitative;
  }

  public void setQuantitative(Boolean quantitative) {
    this.quantitative = quantitative;
  }

  @Override
  public boolean equals(Object object) {
    if (this == object) {
      return true;
    }
    if (!(object instanceof CountableTypeGetDto)) {
      return false;
    }
    final CountableTypeGetDto that = (CountableTypeGetDto) object;
    return Objects.equals(quantitative, that.quantitative);
  }

  @Override
  public int hashCode() {
    return Objects.hash(quantitative);
  }
}
