package ru.relex.aim.service.model.get;

import ru.relex.aim.service.model.base.NamedDto;

import java.util.List;
import java.util.Objects;
import java.util.Set;
import java.util.TreeSet;

/**
 * DTO class for {@link ru.relex.aim.repository.entity.ResourcePool}
 * Used for fetching information to client.
 */
public class ResourcePoolFullGetDto extends NamedDto {


  private Integer totalCapacity;
  private NamedDto resourceType;
  private Integer allocationTypeId;
  private Boolean active;
  private Boolean monitoring;
  private String description;
  private Integer priority;
  private Set<EmployeeGetDto> owners = new TreeSet<>();
  private List<PoolParameterValueGetDto> parametersValues;

  //region Getters and Setters

  public String getDescription() {
    return description;
  }

  public void setDescription(String description) {
    this.description = description;
  }

  public Integer getTotalCapacity() {
    return totalCapacity;
  }

  public void setTotalCapacity(Integer totalCapacity) {
    this.totalCapacity = totalCapacity;
  }


  public Integer getPriority() {
    return priority;
  }

  public void setPriority(Integer priority) {
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

  public NamedDto getResourceType() {
    return resourceType;
  }

  public void setResourceType(NamedDto resourceType) {
    this.resourceType = resourceType;
  }

  public Set<EmployeeGetDto> getOwners() {
    return owners;
  }

  public void setOwners(Set<EmployeeGetDto> owners) {
    if (owners == null) {
      this.owners = new TreeSet<>();
    } else {
      this.owners = new TreeSet<>(owners);
    }
  }

  public List<PoolParameterValueGetDto> getParametersValues() {
    return parametersValues;
  }

  public void setParametersValues(List<PoolParameterValueGetDto> parametersValues) {
    this.parametersValues = parametersValues;
  }

  public Integer getAllocationTypeId() {
    return allocationTypeId;
  }

  public void setAllocationTypeId(Integer allocationTypeId) {
    this.allocationTypeId = allocationTypeId;
  }

  //endregion

  @Override
  public boolean equals(Object object) {
    if (this == object) {
      return true;
    }
    if (!(object instanceof ResourcePoolFullGetDto)) {
      return false;
    }
    final ResourcePoolFullGetDto that = (ResourcePoolFullGetDto) object;
    return Objects.equals(totalCapacity, that.totalCapacity)
        && Objects.equals(resourceType, that.resourceType)
        && Objects.equals(allocationTypeId, that.allocationTypeId)
        && Objects.equals(active, that.active)
        && Objects.equals(monitoring, that.monitoring)
        && Objects.equals(description, that.description)
        && Objects.equals(priority, that.priority)
        && Objects.equals(owners, that.owners)
        && Objects.equals(parametersValues, that.parametersValues);
  }

  @Override
  public int hashCode() {
    return Objects.hash(totalCapacity, resourceType, allocationTypeId, active, monitoring,
        description, priority, owners, parametersValues);
  }
}
