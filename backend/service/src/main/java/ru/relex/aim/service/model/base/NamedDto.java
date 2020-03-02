package ru.relex.aim.service.model.base;

import java.util.Objects;

/**
 * Base data class for DTOs with {@code name} field.
 * Used for nesting DTOs within other DTOs.
 *
 * @author Alexey Alimov
 */
public class NamedDto extends BaseDto {
  private String name;

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  @Override
  public boolean equals(Object object) {
    if (this == object) {
      return true;
    }
    if (!(object instanceof NamedDto)) {
      return false;
    }
    final NamedDto namedDto = (NamedDto) object;
    return Objects.equals(name, namedDto.name);
  }

  @Override
  public int hashCode() {
    return Objects.hash(name);
  }
}
