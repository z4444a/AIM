package ru.relex.aim.service.model.update;

import ru.relex.aim.service.model.base.AbstractCategoryPictureDto;


/**
 * DTO class for {@link ru.relex.aim.repository.entity.CategoryPicture}.
 * Used by client to update an entity.
 *
 * @author Alexey Alimov
 */
public class CategoryPictureUpdateDto extends AbstractCategoryPictureDto {

  private Integer id;

  public Integer getId() {
    return id;
  }

  public void setId(Integer id) {
    this.id = id;
  }
}
