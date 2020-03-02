package ru.relex.aim.service.model.create;

import ru.relex.aim.service.model.base.AbstractRequestDto;

import javax.validation.Valid;
import java.util.List;


/**
 * DTO class for {@link ru.relex.aim.repository.entity.ResourceType}.
 * Used by client to create new entity in database.
 *
 * @author Alexey Alimov
 */
public class RequestCreateDto extends AbstractRequestDto {

  @Valid
  private List<RequestParameterValueCreateDto> resourceTypeParams;

  public List<RequestParameterValueCreateDto> getResourceTypeParams() {
    return resourceTypeParams;
  }

  public void setResourceTypeParams(List<RequestParameterValueCreateDto> resourceTypeParams) {
    this.resourceTypeParams = resourceTypeParams;
  }
}
