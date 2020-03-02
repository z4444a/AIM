package ru.relex.aim.service.model.get;

import ru.relex.aim.repository.entity.RequestParameterValue;

import java.util.Objects;

import ru.relex.aim.commons.modifier.ParameterModifier;

/**
 * DTO transfer class for {@link RequestParameterValue}
 * Used for fetching parameters on request page.
 *
 * @author Nastya Zinchenko
 */
public class ParamValueShortVer {
  private int id;
  private String name;
  private String content;
  private ParameterModifier modifier;
  private Integer order;

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getContent() {
    return content;
  }

  public void setContent(String content) {
    this.content = content;
  }

  public ParameterModifier getModifier() {
    return modifier;
  }

  public void setModifier(ParameterModifier modifier) {
    this.modifier = modifier;
  }

  public int getId() {
    return id;
  }

  public void setId(int id) {
    this.id = id;
  }

  public Integer getOrder() {
    return order;
  }

  public void setOrder(Integer order) {
    this.order = order;
  }

  @Override
  public boolean equals(Object object) {
    if (this == object) {
      return true;
    }
    if (!(object instanceof ParamValueShortVer)) {
      return false;
    }
    final ParamValueShortVer that = (ParamValueShortVer) object;
    return id == that.id
        && Objects.equals(name, that.name)
        && Objects.equals(content, that.content)
        && Objects.equals(modifier, that.modifier)
        && Objects.equals(order, that.order);
  }

  @Override
  public int hashCode() {
    return Objects.hash(id, name, content, modifier, order);
  }
}
