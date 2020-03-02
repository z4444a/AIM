package ru.relex.aim.service.model.base;

import static ru.relex.aim.service.validation.code.ConstraintCode.*;
import static ru.relex.aim.service.validation.code.ParameterCode.*;

import java.util.List;
import java.util.Set;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import ru.relex.aim.commons.EntityType;
import ru.relex.aim.service.validation.annotation.AppropriateType;
import ru.relex.aim.service.validation.annotation.EntityExists;

/**
 * Dto class for {@link ru.relex.aim.repository.entity.ResourcePool}.
 * Holds information shared between update and create DTOs.
 */
@AppropriateType(message = INAPPROPRIATE_TYPE + PARAMETER_VALUE)
public abstract class AbstractResourcePoolDto {

  @NotNull(message = NOT_NULL + POOL_NAME)
  @Size(max = 40, message = SIZE + POOL_NAME)
  private String name;

  private String description;

  @NotNull(message = NOT_NULL + POOL_CAPACITY)
  private int totalCapacity;

  @NotNull(message = NOT_NULL + POOL_PRIORITY)
  private int priority;

  @NotNull(message = NOT_NULL + POOL_MONITORING)
  private Boolean monitoring;

  @NotNull(message = NOT_NULL + POOL_ACTIVE)
  private Boolean active;

  @NotNull(message = NOT_NULL + POOL_TYPE_ID)
  @EntityExists(message = ENTITY_EXISTS + TYPE, entityType = EntityType.RESOURCE_TYPE)
  private Integer resourceTypeId;

  @NotNull(message = NOT_NULL + POOL_ALLOCATION_ID)
  private Integer allocationTypeId;

  private Set<BaseDto> owners;

  /**
   * Returns a list of {@link ru.relex.aim.repository.entity.PoolParameterValue} DTOs.
   * Implement this with implementation of {@link AbstractParameterValueDto}
   * as return value.
   */
  public abstract List<? extends AbstractParameterValueDto> getParametersValues();

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

  public int getTotalCapacity() {
    return totalCapacity;
  }

  public void setTotalCapacity(int totalCapacity) {
    this.totalCapacity = totalCapacity;
  }

  public int getPriority() {
    return priority;
  }

  public void setPriority(int priority) {
    this.priority = priority;
  }

  public Boolean getMonitoring() {
    return monitoring;
  }

  public void setMonitoring(Boolean monitoring) {
    this.monitoring = monitoring;
  }

  public Boolean getActive() {
    return active;
  }

  public void setActive(Boolean active) {
    this.active = active;
  }

  public Integer getResourceTypeId() {
    return resourceTypeId;
  }

  public void setResourceTypeId(Integer resourceTypeId) {
    this.resourceTypeId = resourceTypeId;
  }

  public Integer getAllocationTypeId() {
    return allocationTypeId;
  }

  public void setAllocationTypeId(Integer allocationTypeId) {
    this.allocationTypeId = allocationTypeId;
  }

  public Set<BaseDto> getOwners() {
    return owners;
  }

  public void setOwners(Set<BaseDto> owners) {
    this.owners = owners;
  }
}
