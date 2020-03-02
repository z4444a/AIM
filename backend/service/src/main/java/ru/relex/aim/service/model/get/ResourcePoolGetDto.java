package ru.relex.aim.service.model.get;

import ru.relex.aim.service.model.base.NamedDto;

import java.util.List;
import java.util.Objects;
import java.util.Set;
import java.util.TreeSet;

/**
 * DTO class for {@link ru.relex.aim.repository.entity.ResourcePool}
 * Used for fetching information to client.
 *
 * @author Alexey Alimov
 */
public class ResourcePoolGetDto extends NamedDto {

  private String description;
  private int totalCapacity;
  private int currentCapacity;
  private int priority;
  private Boolean monitoring;
  private Boolean active;
  private CountableTypeGetDto resourceType;
  private Integer allocationTypeId;
  private Set<EmployeeGetDto> owners = new TreeSet<>();
  private List<ParamValueShortVer> parametersValues;
  private int requestsAmount;

  //region Getters and Setters

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

  public int getCurrentCapacity() {
    return currentCapacity;
  }

  public void setCurrentCapacity(int currentCapacity) {
    this.currentCapacity = currentCapacity;
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

  public CountableTypeGetDto getResourceType() {
    return resourceType;
  }

  public void setResourceType(CountableTypeGetDto resourceType) {
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

  public List<ParamValueShortVer> getParametersValues() {
    return parametersValues;
  }

  public void setParametersValues(List<ParamValueShortVer> parametersValues) {
    this.parametersValues = parametersValues;
  }

  public int getRequestsAmount() {
    return requestsAmount;
  }

  public void setRequestsAmount(int requestsAmount) {
    this.requestsAmount = requestsAmount;
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
    if (!(object instanceof ResourcePoolGetDto)) {
      return false;
    }
    final ResourcePoolGetDto that = (ResourcePoolGetDto) object;
    return totalCapacity == that.totalCapacity
        && currentCapacity == that.currentCapacity
        && priority == that.priority
        && requestsAmount == that.requestsAmount
        && Objects.equals(description, that.description)
        && Objects.equals(monitoring, that.monitoring)
        && Objects.equals(active, that.active)
        && Objects.equals(resourceType, that.resourceType)
        && Objects.equals(allocationTypeId, that.allocationTypeId)
        && Objects.equals(owners, that.owners)
        && Objects.equals(parametersValues, that.parametersValues);
  }

  @Override
  public int hashCode() {
    return Objects.hash(description, totalCapacity, currentCapacity, priority, monitoring,
        active, resourceType, allocationTypeId, owners, parametersValues, requestsAmount);
  }
}
