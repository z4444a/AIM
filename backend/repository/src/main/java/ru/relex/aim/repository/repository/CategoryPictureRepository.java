package ru.relex.aim.repository.repository;

import ru.relex.aim.commons.EntityType;
import ru.relex.aim.repository.entity.CategoryPicture;
import ru.relex.aim.repository.repository.base.BaseRepository;
import ru.relex.aim.repository.repository.base.EntityTypedRepository;

/**
 * Repository to manage {@link ru.relex.aim.repository.entity.CategoryPicture}.
 *
 * @author Dmitriy Poshevelya
 */
public interface CategoryPictureRepository extends BaseRepository<CategoryPicture, Integer>,
                                                       EntityTypedRepository<CategoryPicture, Integer> {

  @Override
  default EntityType getEntityType() {
    return EntityType.CATEGORY_PICTURE;
  }
}
