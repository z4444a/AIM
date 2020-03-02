package ru.relex.aim.service.model.get;

import ru.relex.aim.service.model.base.BaseDto;
import ru.relex.aim.service.model.base.NamedDto;
import ru.relex.aim.service.model.base.RequestStateDto;

import java.time.Instant;
import java.time.LocalDate;
import java.util.Objects;
import java.util.Set;

/**
 * DTO class for {@link ru.relex.aim.repository.entity.Request}
 * Used for fetching information to client.
 *
 * @author Alexey Alimov
 */
public class RequestGetDto extends BaseDto {

  private Instant creation;
  private LocalDate usageStart;
  private LocalDate usageFinish;
  private String description;
  private Boolean needsBackup;
  private RequestStateDto state;
  private NamedDto author;
  private NamedDto owner;
  private NamedDto project;
  private CountableTypeGetDto type;
  private NamedDto status;
  private NamedDto pool;
  private Integer amount;
  private Set<ParamValueShortVer> requestParameterValues;

  //region Getters and Setters

  public Instant getCreation() {
    return creation;
  }

  public void setCreation(Instant creation) {
    this.creation = creation;
  }

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

  public RequestStateDto getState() {
    return state;
  }

  public void setState(RequestStateDto state) {
    this.state = state;
  }

  public NamedDto getAuthor() {
    return author;
  }

  public void setAuthor(NamedDto author) {
    this.author = author;
  }

  public NamedDto getOwner() {
    return owner;
  }

  public void setOwner(NamedDto owner) {
    this.owner = owner;
  }

  public NamedDto getProject() {
    return project;
  }

  public void setProject(NamedDto project) {
    this.project = project;
  }

  public CountableTypeGetDto getType() {
    return type;
  }

  public void setType(CountableTypeGetDto type) {
    this.type = type;
  }

  public NamedDto getStatus() {
    return status;
  }

  public void setStatus(NamedDto status) {
    this.status = status;
  }

  public NamedDto getPool() {
    return pool;
  }

  public void setPool(NamedDto pool) {
    this.pool = pool;
  }

  public Integer getAmount() {
    return amount;
  }

  public void setAmount(Integer amount) {
    this.amount = amount;
  }

  public Set<ParamValueShortVer> getRequestParameterValues() {
    return requestParameterValues;
  }

  public void setRequestParameterValues(Set<ParamValueShortVer> requestParameterValues) {
    this.requestParameterValues = requestParameterValues;
  }

  //endregion

  @Override
  public boolean equals(Object object) {
    if (this == object) {
      return true;
    }
    if (!(object instanceof RequestGetDto)) {
      return false;
    }
    final RequestGetDto that = (RequestGetDto) object;
    return Objects.equals(creation, that.creation)
        && Objects.equals(usageStart, that.usageStart)
        && Objects.equals(usageFinish, that.usageFinish)
        && Objects.equals(description, that.description)
        && Objects.equals(needsBackup, that.needsBackup)
        && state == that.state
        && Objects.equals(author, that.author)
        && Objects.equals(owner, that.owner)
        && Objects.equals(project, that.project)
        && Objects.equals(type, that.type)
        && Objects.equals(status, that.status)
        && Objects.equals(pool, that.pool)
        && Objects.equals(amount, that.amount)
        && Objects.equals(requestParameterValues, that.requestParameterValues);
  }

  @Override
  public int hashCode() {
    return Objects.hash(creation, usageStart, usageFinish, description, needsBackup, state,
        author, owner, project, type, status, pool, amount, requestParameterValues);
  }
}
