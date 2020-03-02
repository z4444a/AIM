package ru.relex.aim.service.model.base;

import java.util.Objects;

/**
 * Base data class for DTOs.
 *
 * @author Alexey Alimov
 */
public class BaseDto {
  private Integer id;

  public Integer getId() {
    return id;
  }

  public void setId(Integer id) {
    this.id = id;
  }

  @Override
  public boolean equals(Object object) {
    if (this == object) {
      return true;
    }
    if (!(object instanceof BaseDto)) {
      return false;
    }
    final BaseDto baseDto = (BaseDto) object;
    return Objects.equals(id, baseDto.id);
  }

  @Override
  public int hashCode() {
    return Objects.hash(id);
  }
}
