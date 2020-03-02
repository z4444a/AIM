package ru.relex.aim.service.model.get;

import ru.relex.aim.repository.entity.ListValue;

import java.util.Objects;

/**
 * DTO transfer class for {@link ListValue}
 * Used for fetching information to client.
 *
 * @author Dmitriy Poshevelya
 */
public class ListValueGetDto {

  private int id;

  private String content;

  private Integer order;

  public int getId() {
    return id;
  }

  public void setId(int id) {
    this.id = id;
  }

  public String getContent() {
    return content;
  }

  public void setContent(String content) {
    this.content = content;
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
    if (!(object instanceof ListValueGetDto)) {
      return false;
    }
    final ListValueGetDto that = (ListValueGetDto) object;
    return id == that.id
        && Objects.equals(content, that.content)
        && Objects.equals(order, that.order);
  }

  @Override
  public int hashCode() {
    return Objects.hash(id, content, order);
  }
}
