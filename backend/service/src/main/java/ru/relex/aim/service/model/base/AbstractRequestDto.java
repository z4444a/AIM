package ru.relex.aim.service.model.base;

import static ru.relex.aim.service.validation.code.ConstraintCode.*;
import static ru.relex.aim.service.validation.code.ParameterCode.*;

import java.time.LocalDate;
import javax.validation.constraints.NotNull;

import ru.relex.aim.service.validation.annotation.AfterNow;
import ru.relex.aim.service.validation.annotation.DateFrame;

/**
 * Dto class for {@link ru.relex.aim.repository.entity.Request}.
 * Holds information shared between update and create DTOs.
 */
@DateFrame(message = DATE_FRAME + REQUEST)
public abstract class AbstractRequestDto {

  @AfterNow(message = AFTER_NOW + REQUEST_USAGE_START)
  private LocalDate usageStart;
  @AfterNow(message = AFTER_NOW + REQUEST_USAGE_FINISH)
  private LocalDate usageFinish;
  private String description;
  private Boolean needsBackup;
  private Integer authorId;
  private Integer createdById;
  private Integer projectId;
  @NotNull(message = NOT_NULL + REQUEST_TYPE_ID)
  private Integer typeId;
  private Integer poolId;
  private Integer amount;

  public LocalDate getUsageStart() {
    return usageStart;
  }

  public void setUsageStart(LocalDate usageStart) {
    this.usageStart = usageStart;
  }

  public LocalDate getUsageFinish() {
    return usageFinish;
  }

  public void setUsageFinish(LocalDate usageFinish) {
    this.usageFinish = usageFinish;
  }

  public String getDescription() {
    return description;
  }

  public void setDescription(String description) {
    this.description = description;
  }

  public Boolean getNeedsBackup() {
    return needsBackup;
  }

  public void setNeedsBackup(Boolean needsBackup) {
    this.needsBackup = needsBackup;
  }

  public Integer getAuthorId() {
    return authorId;
  }

  public void setAuthorId(Integer authorId) {
    this.authorId = authorId;
  }

  public Integer getCreatedById() {
    return createdById;
  }

  public void setCreatedById(Integer createdById) {
    this.createdById = createdById;
  }

  public Integer getProjectId() {
    return projectId;
  }

  public void setProjectId(Integer projectId) {
    this.projectId = projectId;
  }

  public Integer getTypeId() {
    return typeId;
  }

  public void setTypeId(Integer typeId) {
    this.typeId = typeId;
  }

  public Integer getPoolId() {
    return poolId;
  }

  public void setPoolId(Integer poolId) {
    this.poolId = poolId;
  }

  public Integer getAmount() {
    return amount;
  }

  public void setAmount(Integer amount) {
    this.amount = amount;
  }
}
