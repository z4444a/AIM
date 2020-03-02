package ru.relex.aim.service.model.update;

import javax.validation.constraints.NotNull;
import ru.relex.aim.service.model.base.AbstractRequestDto;
import ru.relex.aim.service.model.base.RequestStateDto;

import static ru.relex.aim.service.validation.code.ConstraintCode.*;
import static ru.relex.aim.service.validation.code.ParameterCode.*;

/**
 * DTO class for {@link ru.relex.aim.repository.entity.ResourceType}.
 * Used by client to update an entity.
 *
 * @author Alexey Alimov
 */
public class RequestUpdateDto extends AbstractRequestDto {

  private RequestStateDto state;
  private Integer ownerId;
  @NotNull(message = NOT_NULL + REQUEST_STATUS_ID)
  private Integer statusId;

  //region Getters and Setters.

  public Integer getOwnerId() {
    return ownerId;
  }

  public void setOwnerId(Integer ownerId) {
    this.ownerId = ownerId;
  }

  public Integer getStatusId() {
    return statusId;
  }

  public void setStatusId(Integer statusId) {
    this.statusId = statusId;
  }

  public RequestStateDto getState() {
    return state;
  }

  public void setState(RequestStateDto state) {
    this.state = state;
  }
  //endregion
}
