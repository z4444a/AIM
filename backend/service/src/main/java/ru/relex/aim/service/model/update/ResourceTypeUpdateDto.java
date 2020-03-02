package ru.relex.aim.service.model.update;

import java.util.List;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import ru.relex.aim.commons.EntityType;
import ru.relex.aim.service.model.base.AbstractResourceTypeDto;
import ru.relex.aim.service.validation.annotation.EntityExists;

import static ru.relex.aim.service.validation.code.ConstraintCode.*;
import static ru.relex.aim.service.validation.code.ParameterCode.*;

/**
 * DTO class for {@link ru.relex.aim.repository.entity.ResourceType}.
 * Used by client to update an entity.
 *
 * @author Alexey Alimov
 */
public class ResourceTypeUpdateDto extends AbstractResourceTypeDto {

  @NotNull(message = NOT_NULL + TYPE_ID)
  @EntityExists(entityType = EntityType.RESOURCE_TYPE)
  private Integer id;

  private CategoryPictureUpdateDto picture;

  @Valid
  private List<ParameterUpdateDto> parameters;

  public Integer getId() {
    return id;
  }

  public void setId(Integer id) {
    this.id = id;
  }

  @Override
  public List<ParameterUpdateDto> getParameters() {
    return parameters;
  }

  public void setParameters(List<ParameterUpdateDto> parameters) {
    this.parameters = parameters;
  }

  @Override
  public CategoryPictureUpdateDto getPicture() {
    return picture;
  }

  public void setPicture(CategoryPictureUpdateDto picture) {
    this.picture = picture;
  }
}
