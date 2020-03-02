package ru.relex.aim.service.model.get;

import ru.relex.aim.commons.modifier.ParameterModifier;
import ru.relex.aim.service.model.base.ParameterTypeDto;

import java.util.Objects;


/**
 * DTO transfer class for {@link ru.relex.aim.repository.entity.Parameter}
 * Used for fetching information to client.
 *
 * @author Alexey Alimov
 */
public class ParameterGetDto {

  private int id;

  private String identifier;

  private String name;

  private ParameterModifier modifier;

  private Boolean required;

  private Boolean visibleToOwner;

  private ParameterTypeDto parameterType;

  private ParameterConstraintGetDto constraint;

  private Integer order;

  private Integer poolTypeId;

  //region Getters and Setters
  public int getId() {
    return id;
  }

  public void setId(int id) {
    this.id = id;
  }

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

  public ParameterConstraintGetDto getConstraint() {
    return constraint;
  }

  public void setConstraint(ParameterConstraintGetDto constraint) {
    this.constraint = constraint;
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

  //endregion


  @Override
  public boolean equals(Object object) {
    if (this == object) {
      return true;
    }
    if (!(object instanceof ParameterGetDto)) {
      return false;
    }
    final ParameterGetDto that = (ParameterGetDto) object;
    return id == that.id
        && Objects.equals(identifier, that.identifier)
        && Objects.equals(name, that.name)
        && Objects.equals(modifier, that.modifier)
        && Objects.equals(required, that.required)
        && Objects.equals(visibleToOwner, that.visibleToOwner)
        && parameterType == that.parameterType
        && Objects.equals(constraint, that.constraint)
        && Objects.equals(order, that.order);
  }

  @Override
  public int hashCode() {
    return Objects.hash(id, identifier, name, modifier, required, visibleToOwner, parameterType, constraint, order);
  }
}
