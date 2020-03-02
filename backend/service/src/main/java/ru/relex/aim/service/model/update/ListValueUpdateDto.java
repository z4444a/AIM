package ru.relex.aim.service.model.update;

import ru.relex.aim.service.model.base.AbstractListValueDto;

/**
 * DTO class for {@link ru.relex.aim.repository.entity.ListValue}.
 * Used by client to update an entity.
 *
 * @author Alexey Alimov
 */
public class ListValueUpdateDto extends AbstractListValueDto {

  private Integer id;

  public Integer getId() {
    return id;
  }

  public void setId(Integer id) {
    this.id = id;
  }
}
