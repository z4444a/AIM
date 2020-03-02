package ru.relex.aim.service.model.base;

import ru.relex.aim.commons.modifier.ParameterModifier;
import ru.relex.aim.service.validation.annotation.ConstraintMatchesType;
import ru.relex.aim.service.validation.annotation.ParameterIdentifierSyntax;
import ru.relex.aim.service.validation.code.ParameterCode;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import static ru.relex.aim.service.validation.code.ConstraintCode.MISMATCH;
import static ru.relex.aim.service.validation.code.ConstraintCode.NOT_NULL;
import static ru.relex.aim.service.validation.code.ConstraintCode.SIZE;


/**
 * Dto class for {@link ru.relex.aim.repository.entity.Parameter}.
 * Holds information shared between update and create DTOs.
 */
@ConstraintMatchesType(message = MISMATCH + ParameterCode.PARAM_TYPE)
public abstract class AbstractParameterDto {

  @ParameterIdentifierSyntax
  private String identifier;

  @NotNull(message = NOT_NULL + ParameterCode.PARAMETER_NAME)
  @Size(max = 20, message = SIZE + ParameterCode.PARAMETER_NAME)
  private String name;

  @NotNull(message = NOT_NULL + ParameterCode.PARAMETER_REQUIRED)
  private Boolean required;

  private Boolean visibleToOwner;

  @NotNull(message = NOT_NULL + ParameterCode.PARAM_TYPE)
  private ParameterTypeDto parameterType;

  @NotNull(message = NOT_NULL + ParameterCode.PARAMETER_MODIFIER)
  private ParameterModifier modifier;

  @NotNull(message = NOT_NULL + ParameterCode.PARAMETER_ORDER)
  private Integer order;

  private Integer poolTypeId;

  /**
   * Returns a {@link ru.relex.aim.repository.entity.ParameterConstraint} DTO.
   * Implement this with implementation of {@link AbstractParameterConstraintDto}
   * as return value.
   */
  public abstract AbstractParameterConstraintDto getConstraint();

  public String getIdentifier() {
    return identifier;
  }

  public void setIdentifier(String identifier) {
    this.identifier = identifier;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public Boolean getRequired() {
    return required;
  }

  public void setRequired(Boolean required) {
    this.required = required;
  }

  public ParameterTypeDto getParameterType() {
    return parameterType;
  }

  public void setParameterType(ParameterTypeDto parameterType) {
    this.parameterType = parameterType;
  }

  public ParameterModifier getModifier() {
    return modifier;
  }

  public void setModifier(ParameterModifier modifier) {
    this.modifier = modifier;
  }

  public Integer getOrder() {
    return order;
  }

  public void setOrder(Integer order) {
    this.order = order;
  }

  public Boolean getVisibleToOwner() {
    return visibleToOwner;
  }

  public void setVisibleToOwner(Boolean visibleToOwner) {
    this.visibleToOwner = visibleToOwner;
  }

  public Integer getPoolTypeId() {
    return poolTypeId;
  }

  public void setPoolTypeId(Integer poolTypeId) {
    this.poolTypeId = poolTypeId;
  }
}
