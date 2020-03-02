package ru.relex.aim.service.model;

import ru.relex.aim.service.model.base.BaseDto;
import ru.relex.aim.service.model.create.RequestParameterValueCreateDto;
import ru.relex.aim.service.service.IRequestStatusService;

import javax.validation.Valid;
import java.util.List;

/**
 * Represents request body contains {@link ru.relex.aim.repository.entity.Request}
 * identifier, list of allocation parameter values, pool identifier and comment.
 * Used by {@link IRequestStatusService}
 * to accept request with allocation parameters and save comment.
 */
public class RequestAcceptDto extends BaseDto {

  @Valid
  private List<RequestParameterValueCreateDto> allocationValues;

  private String comment;

  private Integer poolId;

  public Integer getPoolId() {
    return poolId;
  }

  public void setPoolId(Integer poolId) {
    this.poolId = poolId;
  }

  public List<RequestParameterValueCreateDto> getAllocationValues() {
    return allocationValues;
  }

  public void setAllocationValues(List<RequestParameterValueCreateDto> allocationValues) {
    this.allocationValues = allocationValues;
  }

  public String getComment() {
    return comment;
  }

  public void setComment(String comment) {
    this.comment = comment;
  }
}
