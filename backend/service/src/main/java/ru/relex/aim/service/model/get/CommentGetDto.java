package ru.relex.aim.service.model.get;

import ru.relex.aim.service.model.base.BaseDto;
import ru.relex.aim.service.model.base.NamedDto;

import java.time.Instant;
import java.util.Objects;

/**
 * DTO class for {@link ru.relex.aim.repository.entity.Comment}
 * Used for fetching information to client.
 *
 * @author Sorokin Georgy
 */
public class CommentGetDto extends BaseDto {

  private Instant datetime;
  private String content;
  private BaseDto request;
  private NamedDto author;

  public Instant getDatetime() {
    return datetime;
  }

  public void setDatetime(Instant datetime) {
    this.datetime = datetime;
  }

  public String getContent() {
    return content;
  }

  public void setContent(String content) {
    this.content = content;
  }

  public BaseDto getRequest() {
    return request;
  }

  public void setRequest(BaseDto request) {
    this.request = request;
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
    if (!(object instanceof CommentGetDto)) {
      return false;
    }
    final CommentGetDto that = (CommentGetDto) object;
    return Objects.equals(datetime, that.datetime)
        && Objects.equals(content, that.content)
        && Objects.equals(request, that.request)
        && Objects.equals(author, that.author);
  }

  @Override
  public int hashCode() {
    return Objects.hash(datetime, content, request, author);
  }
}
