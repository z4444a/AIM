package ru.relex.aim.repository.entity;


import ru.relex.aim.commons.modifier.ParameterModifier;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.OrderBy;
import javax.persistence.Table;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

/**
 * Represents a parameter of a resource type.
 *
 * @author Nastya Zinchenko
 */
@Entity
@Table(name = "parameters", schema = "aim")
public class Parameter {
  private final static String PARAMETER_FIELD = "parameter";
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "parameter_id")
  private Integer id;

  @Column(name = "identifier")
  private String identifier;

  @Column(name = "name", nullable = false)
  private String name;

  @ManyToOne
  @JoinColumn(name = "category_id", nullable = false)
  private ResourceType resourceType;

  @OneToMany(mappedBy = PARAMETER_FIELD, cascade = CascadeType.ALL, orphanRemoval = true)
  @OrderBy("order ASC")
  private List<ListValue> listValues = new ArrayList<>();

  @ManyToOne
  @JoinColumn(name = "parameter_type_id", nullable = false)
  private ParameterType parameterType;

  @OneToOne(mappedBy = PARAMETER_FIELD, cascade = CascadeType.ALL, orphanRemoval = true)
  private ParameterConstraint constraint;

  @Column(name = "modifier_id", nullable = false)
  private ParameterModifier modifier;

  @Column(name = "required", nullable = false)
  private Boolean required;

  @Column(name = "visible_to_owner")
  private Boolean visibleToOwner;

  @Column(name = "\"order\"", nullable = false)
  private Integer order;

  @Column(name = "pool_type_id")
  private Integer poolTypeId;

  //region Getters and Setters
  public Integer getId() {
    return id;
  }

  public void setId(Integer id) {
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

  public ResourceType getResourceType() {
    return resourceType;
  }

  public void setResourceType(ResourceType resourceType) {
    this.resourceType = resourceType;
  }

  public ParameterType getParameterType() {
    return parameterType;
  }

  public void setParameterType(ParameterType type) {
    this.parameterType = type;
  }

  public Boolean getRequired() {
    return required;
  }

  public void setRequired(Boolean required) {
    this.required = required;
  }

  public List<ListValue> getListValues() {
    return listValues;
  }

  /**
   * Sets listValues.
   */
  public void setListValues(List<ListValue> listValue) {
    if (listValue != null) {
      for (final ListValue value : listValue) {
        value.setParameter(this);
      }
      if (this.listValues == null) {
        this.listValues = listValue;
        return;
      }
      this.listValues.clear();
      this.listValues.addAll(listValue);
    }
  }

  public ParameterConstraint getConstraint() {
    return constraint;
  }

  public void setConstraint(ParameterConstraint constraint) {
    this.constraint = constraint;

    if (constraint == null) {
      return;
    }

    this.constraint.setParameter(this);
    this.constraint.setId(this.id);
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
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (!(o instanceof Parameter)) {
      return false;
    }
    final Parameter parameter = (Parameter) o;
    return Objects.equals(id, parameter.id)
        && Objects.equals(identifier, parameter.identifier)
        && Objects.equals(name, parameter.name)
        && Objects.equals(resourceType.getId(), parameter.resourceType.getId())
        && Objects.equals(parameterType.getId(), parameter.parameterType.getId())
        && Objects.equals(constraint.getId(), parameter.constraint.getId())
        && modifier == parameter.modifier
        && Objects.equals(required, parameter.required)
        && Objects.equals(visibleToOwner, parameter.visibleToOwner)
        && Objects.equals(order, parameter.order);
  }

  @Override
  public int hashCode() {
    final var resourceTypeId = resourceType == null ? null : resourceType.getId();
    final var parameterTypeId = parameterType == null ? null : parameterType.getId();
    final var constraintId = constraint == null ? null : constraint.getId();
    return Objects.hash(id, identifier, name, resourceTypeId,
        parameterTypeId, constraintId, modifier, required, visibleToOwner, order);
  }

}
