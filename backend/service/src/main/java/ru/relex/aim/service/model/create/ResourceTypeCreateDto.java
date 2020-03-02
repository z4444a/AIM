package ru.relex.aim.service.model.create;


import javax.validation.Valid;
import ru.relex.aim.service.model.base.AbstractResourceTypeDto;
import ru.relex.aim.service.validation.annotation.UniqueNames;

import java.util.List;

import static ru.relex.aim.service.validation.code.ConstraintCode.*;
import static ru.relex.aim.service.validation.code.ParameterCode.*;

/**
 * DTO creating class for {@link ru.relex.aim.repository.entity.ResourceType}
 * Used for creating new instance from client data.
 *
 * @author Dmitriy Poshevelya
 */
@UniqueNames(message = DUPLICATE + PARAMETER)
public class ResourceTypeCreateDto extends AbstractResourceTypeDto {

  private CategoryPictureCreateDto picture;

  @Valid
  private List<ParameterCreateDto> parameters;

  @Override
  public List<ParameterCreateDto> getParameters() {
    return parameters;
  }

  public void setParameters(List<ParameterCreateDto> parameters) {
    this.parameters = parameters;
  }

  @Override
  public CategoryPictureCreateDto getPicture() {
    return picture;
  }

  public void setPicture(CategoryPictureCreateDto picture) {
    this.picture = picture;
  }
}
