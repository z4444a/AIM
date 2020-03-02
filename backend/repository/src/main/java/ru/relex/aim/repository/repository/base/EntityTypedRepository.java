package ru.relex.aim.repository.repository.base;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.NoRepositoryBean;
import ru.relex.aim.commons.EntityType;

/**
 * Base repository type that can be used to easily get managed {@link EntityType} without getting actual class,
 * which can be used for field validation.
 *
 * @author Nikita Skornyakov
 * @date 22.07.2019
 */
@NoRepositoryBean
public interface EntityTypedRepository<T, ID> extends CrudRepository<T, ID> {

  /**
   * Retrieves type of entity managed by this repository.
   */
  EntityType getEntityType();

}
