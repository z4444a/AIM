package ru.relex.aim.service.model.get;

import ru.relex.aim.service.model.base.NamedDto;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

/**
 * DTO transfer class for {@link ru.relex.aim.repository.entity.ResourceType}
 * Used for fetching information to client.
 *
 * @author Alexey Alimov
 */
public class ResourceTypeGetDto extends NamedDto {

  private String description;

  private Boolean needsBackup;

  private Boolean active;

  private CategoryPictureGetDto picture;

  private Boolean quantitative;

  private List<ParameterGetDto> parameters;

  //region Getters and Setters

  public List<ParameterGetDto> getParameters() {
    return parameters;
  }

  public void setParameters(List<ParameterGetDto> parameters) {
    this.parameters = parameters;
  }

  public String getDescription() {
    return description;
  }

  public void setDescription(String description) {
    this.description = description;
  }

  public Boolean getNeedsBackup() {
    return needsBackup;
  }

  public void setNeedsBackup(Boolean needsBackup) {
    this.needsBackup = needsBackup;
  }

  public Boolean getActive() {
    return active;
  }

  public void setActive(Boolean active) {
    this.active = active;
  }

  public CategoryPictureGetDto getPicture() {
    return picture;
  }

  public void setPicture(CategoryPictureGetDto picture) {
    this.picture = picture;
  }

  public Boolean getQuantitative() {
    return quantitative;
  }

  public void setQuantitative(Boolean quantitative) {
    this.quantitative = quantitative;
  }

  //endregion

  @Override
  public boolean equals(Object object) {
    if (this == object) {
      return true;
    }
    if (!(object instanceof ResourceTypeGetDto)) {
      return false;
    }
    final ResourceTypeGetDto that = (ResourceTypeGetDto) object;
    return Objects.equals(description, that.description)
        && Objects.equals(needsBackup, that.needsBackup)
        && Objects.equals(active, that.active)
        && Objects.equals(picture, that.picture)
        && Objects.equals(quantitative, that.quantitative)
        && Objects.equals(parameters, that.parameters);
  }

  @Override
  public int hashCode() {
    return Objects.hash(description, needsBackup, active, picture, quantitative, parameters);
  }
}
