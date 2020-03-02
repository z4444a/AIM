package ru.relex.aim.repository.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import ru.relex.aim.commons.EntityType;
import ru.relex.aim.repository.entity.ResourceType;
import ru.relex.aim.repository.repository.base.BaseRepository;
import ru.relex.aim.repository.repository.base.EntityTypedRepository;

/**
 * Manages {@link ResourceType}.
 *
 * @author Alexey Alimov
 */
public interface ResourceTypeRepository
    extends BaseRepository<ResourceType, Integer>, JpaSpecificationExecutor<ResourceType>,
                EntityTypedRepository<ResourceType, Integer> {

  @Override
  default EntityType getEntityType() {
    return EntityType.RESOURCE_TYPE;
  }

  /**
   * Finds instances of {@link ResourceType} with specified active parameter.
   *
   * @param active parameter for selection
   * @return list instance
   */
  List<ResourceType> findByActive(Boolean active);
}
