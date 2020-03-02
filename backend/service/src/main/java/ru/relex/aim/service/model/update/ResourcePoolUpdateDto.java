package ru.relex.aim.service.model.update;

import ru.relex.aim.commons.EntityType;
import ru.relex.aim.service.model.base.AbstractResourcePoolDto;
import ru.relex.aim.service.validation.annotation.EntityExists;

import static ru.relex.aim.service.validation.code.ConstraintCode.*;
import static ru.relex.aim.service.validation.code.ParameterCode.*;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import java.util.List;

/**
 * DTO updating class for {@link ru.relex.aim.repository.entity.ResourcePool}.
 * Used for updating existing instance.
 *
 * @author Sorokin Georgy
 */
public class ResourcePoolUpdateDto extends AbstractResourcePoolDto {

  @NotNull(message = NOT_NULL + POOL_ID)
  @EntityExists(entityType = EntityType.RESOURCE_POOL)
  private Integer id;

  @Valid
  private List<PoolParameterValueUpdateDto> parametersValues;

  @Override
  public List<PoolParameterValueUpdateDto> getParametersValues() {
    return parametersValues;
  }

  public void setParametersValues(List<PoolParameterValueUpdateDto> parametersValues) {
    this.parametersValues = parametersValues;
  }

  public Integer getId() {
    return id;
  }

  public void setId(Integer id) {
    this.id = id;
  }
}
