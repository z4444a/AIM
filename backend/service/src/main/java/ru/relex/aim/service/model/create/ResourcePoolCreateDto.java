package ru.relex.aim.service.model.create;

import ru.relex.aim.service.model.base.AbstractResourcePoolDto;

import javax.validation.Valid;
import java.util.List;

/**
 * DTO creating class for {@link ru.relex.aim.repository.entity.ResourcePool}
 * Used for creating new instance from client data.
 *
 * @author Nastya Zinchenko
 */
public class ResourcePoolCreateDto extends AbstractResourcePoolDto {

  @Valid
  private List<PoolParameterValueCreateDto> parametersValues;

  @Override
  public List<PoolParameterValueCreateDto> getParametersValues() {
    return parametersValues;
  }

  public void setParametersValues(List<PoolParameterValueCreateDto> parametersValues) {
    this.parametersValues = parametersValues;
  }
}
