package ru.relex.aim.service.model.create;

import ru.relex.aim.commons.EntityType;
import ru.relex.aim.service.model.base.AbstractParameterValueDto;
import ru.relex.aim.service.validation.annotation.EntityExists;

/**
 * DTO class for {@link ru.relex.aim.repository.entity.PoolParameterValue}.
 * Used by client to create new entity in database.
 *
 * @author Nastya Zinchenko
 */

public class PoolParameterValueCreateDto extends AbstractParameterValueDto {
  private Integer poolId;

  @EntityExists(entityType = EntityType.RESOURCE_POOL)
  private Integer parameterPoolId;

  public Integer getPoolId() {
    return poolId;
  }

  public void setPoolId(Integer poolId) {
    this.poolId = poolId;
  }

  public Integer getParameterPoolId() {
    return parameterPoolId;
  }

  public void setParameterPoolId(Integer parameterPoolId) {
    this.parameterPoolId = parameterPoolId;
  }
}
