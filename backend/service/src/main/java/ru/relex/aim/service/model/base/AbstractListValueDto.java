package ru.relex.aim.service.model.base;

import static ru.relex.aim.service.validation.code.ConstraintCode.NOT_NULL;
import static ru.relex.aim.service.validation.code.ConstraintCode.SIZE;
import static ru.relex.aim.service.validation.code.ParameterCode.LIST_VALUE_CONTENT;
import static ru.relex.aim.service.validation.code.ParameterCode.LIST_VALUE_ORDER;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

/**
 * Dto class for {@link ru.relex.aim.repository.entity.ListValue}.
 * Holds information shared between update and create DTOs.
 */
public abstract class AbstractListValueDto {

  @NotBlank(message = NOT_NULL + LIST_VALUE_CONTENT)
  @Size(max = 30, message = SIZE + LIST_VALUE_CONTENT)
  private String content;

  @NotNull(message = NOT_NULL + LIST_VALUE_ORDER)
  private Integer order;

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
}
