package ru.relex.aim.repository.repository;

import java.util.List;
import ru.relex.aim.commons.EntityType;
import ru.relex.aim.repository.entity.ListValue;
import ru.relex.aim.repository.repository.base.BaseRepository;
import ru.relex.aim.repository.repository.base.EntityTypedRepository;

/**
 * Manages {@link ListValue}.
 *
 * @author Alexey Alimov
 */
public interface ListValueRepository extends BaseRepository<ListValue, Integer>,
                                                 EntityTypedRepository<ListValue, Integer> {

  @Override
  default EntityType getEntityType() {
    return EntityType.LIST_VALUE;
  }

  /**
   * Retrieves all list values for parameter with provided id.
   *
   * @param parameterId identifier of the parameter.
   * @return If parameter either doesn't exists or have any list values returns empty list instead.
   */
  List<ListValue> findAllByParameterId(int parameterId);
}
