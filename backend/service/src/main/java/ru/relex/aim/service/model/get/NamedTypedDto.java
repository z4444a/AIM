package ru.relex.aim.service.model.get;

import ru.relex.aim.service.model.base.NamedDto;

/**
 * Represents pool and request named models extended by a type identifier.
 */
public class NamedTypedDto extends NamedDto {
  private Integer typeId;

  public Integer getTypeId() {
    return typeId;
  }

  public void setTypeId(Integer typeId) {
    this.typeId = typeId;
  }
}
