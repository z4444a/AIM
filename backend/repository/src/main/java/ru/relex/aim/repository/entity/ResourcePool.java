package ru.relex.aim.repository.entity;

import javax.persistence.Entity;
import javax.persistence.OrderBy;
import javax.persistence.Table;
import javax.persistence.Id;
import javax.persistence.GeneratedValue;
import javax.persistence.Column;
import javax.persistence.ManyToOne;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.OneToMany;
import javax.persistence.GenerationType;
import javax.persistence.ManyToMany;
import javax.persistence.CascadeType;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Set;

/**
 * Represents a pool from which resources are allocated.
 *
 * @author Alexey Alimov
 */
@Entity
@Table(name = "resource_pools", schema = "aim")
public class ResourcePool {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "resource_pool_id")
  private Integer id;

  @Column(name = "name", nullable = false)
  private String name;

  @Column(name = "description")
  private String description;

  @Column(name = "total_capacity", nullable = false)
  private int totalCapacity;

  @Column(name = "current_capacity", nullable = false)
  private int currentCapacity;

  @Column(name = "priority", nullable = false)
  private int priority;

  @Column(name = "state_monitoring_available", nullable = false)
  private Boolean monitoring;

  @Column(name = "active", nullable = false)
  private Boolean active;

  @ManyToOne
  @JoinColumn(name = "resource_category_id", nullable = false)
  private ResourceType resourceType;

  @Column(name = "type_allocation_id", nullable = false)
  private AllocationType allocationTypeId;

  @ManyToMany
  @JoinTable(name = "resources_owners", schema = "aim",
      joinColumns = @JoinColumn(name = "resource_pool_id"),
      inverseJoinColumns = @JoinColumn(name = "owner_id")
  )
  private Set<Employee> owners;

  @OneToMany(mappedBy = "pool", cascade = CascadeType.ALL, orphanRemoval = true)
  @OrderBy("order ASC")
  private List<PoolParameterValue> parametersValues = new ArrayList<>();

  //region Getters
  public Integer getId() {
    return id;
  }

  public String getName() {
    return name;
  }

  public String getDescription() {
    return description;
  }

  public int getTotalCapacity() {
    return totalCapacity;
  }

  public int getCurrentCapacity() {
    return currentCapacity;
  }

  public int getPriority() {
    return priority;
  }

  public Boolean getMonitoring() {
    return monitoring;
  }

  public Boolean getActive() {
    return active;
  }

  public ResourceType getResourceType() {
    return resourceType;
  }

  public Set<Employee> getOwners() {
    return owners;
  }

  public List<PoolParameterValue> getParametersValues() {
    return parametersValues;
  }

  public AllocationType getAllocationTypeId() {
    return allocationTypeId;
  }
  //endregion

  //region Setters
  public void setId(Integer id) {
    this.id = id;
  }

  public void setName(String name) {
    this.name = name;
  }

  public void setDescription(String description) {
    this.description = description;
  }

  public void setTotalCapacity(int totalCapacity) {
    this.totalCapacity = totalCapacity;
  }

  public void setCurrentCapacity(int currentCapacity) {
    this.currentCapacity = currentCapacity;
  }

  public void setPriority(int priority) {
    this.priority = priority;
  }

  public void setMonitoring(Boolean monitoring) {
    this.monitoring = monitoring;
  }

  public void setActive(Boolean active) {
    this.active = active;
  }

  public void setResourceType(ResourceType resourceType) {
    this.resourceType = resourceType;
  }

  public void setOwners(Set<Employee> owners) {
    this.owners = owners;
  }

  /**
   * Set parametersValues.
   */
  public void setParametersValues(List<PoolParameterValue> parametersValues) {
    if (parametersValues != null && !parametersValues.isEmpty()) {
      parametersValues.forEach(x -> x.setPool(this));
    }

    this.parametersValues = parametersValues;
  }

  public void setAllocationTypeId(AllocationType allocationTypeId) {
    this.allocationTypeId = allocationTypeId;
  }
  //endregion


  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (!(o instanceof ResourcePool)) {
      return false;
    }
    final ResourcePool that = (ResourcePool) o;
    return totalCapacity == that.totalCapacity
        && currentCapacity == that.currentCapacity
        && priority == that.priority
        && Objects.equals(id, that.id)
        && Objects.equals(name, that.name)
        && Objects.equals(description, that.description)
        && Objects.equals(monitoring, that.monitoring)
        && Objects.equals(active, that.active)
        && Objects.equals(resourceType.getId(), that.resourceType.getId())
        && allocationTypeId == that.allocationTypeId;
  }

  @Override
  public int hashCode() {
    final var typeId = resourceType == null ? null : resourceType.getId();
    return Objects.hash(id, name, description, totalCapacity, currentCapacity, priority, monitoring, active,
        typeId, allocationTypeId);
  }
}
