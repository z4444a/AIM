package ru.relex.aim.service.model.get;

import ru.relex.aim.service.model.base.BaseDto;
import ru.relex.aim.service.model.base.NamedDto;

import java.time.Instant;
import java.util.Objects;

/**
 * DTO class for {@link ru.relex.aim.repository.entity.RequestStatusChange}
 * Used for fetching information to client.
 *
 * @author Sorokin Georgy
 */
public class RequestStatusChangeGetDto extends BaseDto {

  private Instant datetime;
  private NamedDto status;
  private NamedDto author;

  public Instant getDatetime() {
    return datetime;
  }

  public void setDatetime(Instant datetime) {
    this.datetime = datetime;
  }

  public NamedDto getStatus() {
    return status;
  }

  public void setStatus(NamedDto status) {
    this.status = status;
  }

  public NamedDto getAuthor() {
    return author;
  }

  public void setAuthor(NamedDto author) {
    this.author = author;
  }

  @Override
  public boolean equals(Object object) {
    if (this == object) {
      return true;
    }
    if (!(object instanceof RequestStatusChangeGetDto)) {
      return false;
    }
    final RequestStatusChangeGetDto that = (RequestStatusChangeGetDto) object;
    return Objects.equals(datetime, that.datetime)
        && Objects.equals(status, that.status)
        && Objects.equals(author, that.author);
  }

  @Override
  public int hashCode() {
    return Objects.hash(datetime, status, author);
  }
}
