package ru.relex.aim.service.model.update;

import ru.relex.aim.commons.EntityType;
import ru.relex.aim.service.model.base.AbstractParameterValueDto;
import ru.relex.aim.service.validation.annotation.EntityExists;

import static ru.relex.aim.service.validation.code.ConstraintCode.ENTITY_EXISTS;
import static ru.relex.aim.service.validation.code.ParameterCode.PARAMETER_VALUE;
import static ru.relex.aim.service.validation.code.ParameterCode.POOL;

/**
 * DTO class for {@link ru.relex.aim.repository.entity.PoolParameterValue}.
 * Used by client to update an entity.
 *
 * @author Nastya Zinchenko
 */
public class PoolParameterValueUpdateDto extends AbstractParameterValueDto {

  @EntityExists(message = ENTITY_EXISTS + PARAMETER_VALUE, entityType = EntityType.POOL_PARAMETER_VALUE)
  private Integer id;
  private Integer poolId;

  @EntityExists(entityType = EntityType.RESOURCE_POOL, message = ENTITY_EXISTS + POOL)
  private Integer parameterPoolId;

  public Integer getPoolId() {
    return poolId;
  }

  public void setPoolId(Integer poolId) {
    this.poolId = poolId;
  }

  public Integer getId() {
    return id;
  }

  public void setId(Integer id) {
    this.id = id;
  }

  public Integer getParameterPoolId() {
    return parameterPoolId;
  }

  public void setParameterPoolId(Integer parameterPoolId) {
    this.parameterPoolId = parameterPoolId;
  }
}
