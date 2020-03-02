package ru.relex.aim.service.model.base;

import static ru.relex.aim.service.validation.code.ConstraintCode.*;
import static ru.relex.aim.service.validation.code.ParameterCode.*;

import java.util.List;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import ru.relex.aim.service.validation.annotation.UniqueNames;

/**
 * Dto class for {@link ru.relex.aim.repository.entity.ResourceType}.
 * Holds information shared between update and create dtos.
 */
@UniqueNames(message = DUPLICATE + PARAMETER)
public abstract class AbstractResourceTypeDto {


  @NotBlank(message = NOT_NULL + TYPE_NAME)
  @Size(max = 20, message = SIZE + TYPE_NAME)
  private String name;

  private String description;

  @NotNull(message = NOT_NULL + TYPE_QUANTITATIVE)
  private Boolean quantitative;

  @NotNull(message = NOT_NULL + TYPE_ACTIVE)
  private Boolean active;

  @NotNull(message = NOT_NULL + TYPE_NEEDS_BACKUP)
  private Boolean needsBackup;

  /**
   * Returns a list of {@link ru.relex.aim.repository.entity.Parameter} DTOs.
   * Implement this with implementation of {@link AbstractParameterDto}
   * as return value.
   */
  public abstract List<? extends AbstractParameterDto> getParameters();

  /**
   * Returns a {@link ru.relex.aim.repository.entity.CategoryPicture}.
   * Implement this with implementation of {@link AbstractParameterDto}
   * as return value.
   */
  public abstract AbstractCategoryPictureDto getPicture();

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getDescription() {
    return description;
  }

  public void setDescription(String description) {
    this.description = description;
  }

  public Boolean getActive() {
    return active;
  }

  public void setActive(Boolean active) {
    this.active = active;
  }

  public Boolean getNeedsBackup() {
    return needsBackup;
  }

  public void setNeedsBackup(Boolean needsBackup) {
    this.needsBackup = needsBackup;
  }

  public Boolean getQuantitative() {
    return quantitative;
  }

  public void setQuantitative(Boolean quantitative) {
    this.quantitative = quantitative;
  }
}
