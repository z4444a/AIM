package ru.relex.aim.repository.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import ru.relex.aim.commons.EntityType;
import ru.relex.aim.repository.entity.Chart;
import ru.relex.aim.repository.entity.NamedEntity;
import ru.relex.aim.repository.entity.ResourcePool;
import ru.relex.aim.repository.repository.base.BaseRepository;
import ru.relex.aim.repository.repository.base.EntityTypedRepository;

import java.util.List;
import java.util.Set;

/**
 * Repository to manage {@link ru.relex.aim.repository.entity.ResourcePool}.
 *
 * @author Nastya Zinchenko
 */
public interface ResourcePoolRepository
    extends BaseRepository<ResourcePool, Integer>, EntityTypedRepository<ResourcePool, Integer> {

  @Override
  default EntityType getEntityType() {
    return EntityType.RESOURCE_POOL;
  }

  /**
   * Finds all instances of {@link Chart} for specified owners and resource types.
   *
   * @param ownersId parameter for selection
   * @param typesId  parameter for selection
   */
  @Query(nativeQuery = true,
      value = "SELECT e.employee_id AS ownerId, "
          + "e.last_name || ' ' || e.first_name AS ownerName, "
          + "rc.resource_category_id AS typeId, "
          + "rc.name AS typeName, "
          + "COUNT(*) AS amount "
          + "FROM aim.employees e JOIN aim.resources_owners ro ON e.employee_id=owner_id "
          + "JOIN aim.resource_pools rp ON ro.resource_pool_id=rp.resource_pool_id "
          + "JOIN aim.resource_categories rc ON rp.resource_category_id=rc.resource_category_id "
          + "WHERE e.employee_id IN :ownersId AND rc.resource_category_id IN :typesId "
          + "GROUP BY e.employee_id, rc.resource_category_id")
  List<Chart> getDataToChart(@Param("ownersId") int[] ownersId, @Param("typesId") int[] typesId);

  /**
   * Finds all pools of current user by his id.
   *
   * @param id user identifier
   */
  @Query("SELECT u.resourcePools FROM Employee u WHERE u.id = :id")
  Set<ResourcePool> getResourcePoolByOwnerId(@Param("id") int id);

  /**
   * Finds all pools by given parameters and sorts descending.
   *
   * @param typeId        resource type of gotten pools
   * @param capacityCheck true, if capacity check is needed
   * @param capacity      count of resource items contained in pool
   * @param userCheck     true, if user check is needed
   * @param userId        pool owner identifier
   * @return
   */
  @Query(nativeQuery = true,
      value = "SELECT pools.resource_pool_id as id, pools.name as name "
          + "FROM aim.resource_pools pools "
          + "WHERE pools.active "
          + "AND pools.resource_category_id = :typeId "
          + "AND (NOT :capacityCheck OR  :capacity <= pools.current_capacity) "
          + "AND (NOT :userCheck OR pools.resource_pool_id IN ( "
          + " SELECT ro.resource_pool_id "
          + " FROM aim.resources_owners ro "
          + " WHERE ro.owner_id = :userId )) "
          + "ORDER BY pools.priority DESC;")
  List<NamedEntity> getSuggestions(@Param("typeId") int typeId,
                                   @Param("capacityCheck") boolean capacityCheck, @Param("capacity") int capacity,
                                   @Param("userCheck") boolean userCheck, @Param("userId") int userId);

  /**
   * Finds email address of employee who has pools
   * having a type with the given id and having more capacity that the given capacity.
   * Capacity validation is skipped if the type is not quantitative.
   *
   * @return list of emails.
   */
  @Query(nativeQuery = true,
      value = "SELECT e.username FROM aim.employees e "
          + "INNER JOIN aim.resources_owners ro ON e.employee_id = ro.owner_id "
          + "INNER JOIN aim.resource_pools rp ON ro.resource_pool_id = rp.resource_pool_id "
          + "WHERE rp.active "
          + " AND rp.resource_category_id = :typeId "
          + " AND (NOT :quantitative OR current_capacity >= :capacity); ")
  List<String> getPoolOwnersEmailsToNotify(@Param("typeId") int typeId,
                                           @Param("quantitative") boolean quantitative,
                                           @Param("capacity") int capacity);

  /**
   * Counts the number of  pools have type qualified by identifier.
   *
   * @param typeId is type identifier.
   * @return count of pools.
   */
  Integer countAllByResourceTypeId(Integer typeId);
}
