package ru.relex.aim.repository.entity;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

/**
 * Represents a resource type.
 *
 * @author Alexey Alimov
 */
@Entity
@Table(name = "resource_categories", schema = "aim")
public class ResourceType {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "resource_category_id")
  private Integer id;

  @Column(name = "name", nullable = false)
  private String name;

  @Column(name = "description")
  private String description;

  @Column(name = "quantitative", nullable = false)
  private Boolean quantitative;

  @Column(name = "need_backup", nullable = false)
  private Boolean needsBackup;

  @Column(name = "active", nullable = false)
  private Boolean active;

  @OneToOne(cascade = CascadeType.ALL)
  @JoinColumn(name = "picture_id")
  private CategoryPicture picture;

  @OneToMany(mappedBy = "resourceType", cascade = CascadeType.ALL, orphanRemoval = true)
  private List<Parameter> parameters = new ArrayList<>();

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

  public Boolean getNeedsBackup() {
    return needsBackup;
  }

  public Boolean getActive() {
    return active;
  }

  public CategoryPicture getPicture() {
    return picture;
  }

  public List<Parameter> getParameters() {
    return parameters;
  }

  public Boolean getQuantitative() {
    return quantitative;
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

  public void setNeedsBackup(Boolean needsBackup) {
    this.needsBackup = needsBackup;
  }

  public void setActive(Boolean active) {
    this.active = active;
  }

  public void setPicture(CategoryPicture picture) {
    this.picture = picture;
  }

  public void setParameters(List<Parameter> parameters) {
    for (final Parameter parameter : parameters) {
      parameter.setResourceType(this);
    }
    this.parameters = parameters;
  }

  public void setQuantitative(Boolean quantitative) {
    this.quantitative = quantitative;
  }

  //endregion


  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (!(o instanceof ResourceType)) {
      return false;
    }
    final ResourceType that = (ResourceType) o;
    return Objects.equals(id, that.id)
        && Objects.equals(name, that.name)
        && Objects.equals(description, that.description)
        && Objects.equals(quantitative, that.quantitative)
        && Objects.equals(needsBackup, that.needsBackup)
        && Objects.equals(active, that.active)
        && Objects.equals(picture, that.picture);
  }

  @Override
  public int hashCode() {
    return Objects.hash(id, name, description, quantitative, needsBackup, active, picture);
  }
}
