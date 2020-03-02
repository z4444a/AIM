package ru.relex.aim.service.model.get;

import java.util.Objects;
import java.util.Set;

/**
 * DTO class for {@link ru.relex.aim.repository.entity.Request}
 * Used for fetching request with comments to client.
 *
 * @author Nastya Zinchenko
 */
public class RequestGetDtoWithComments extends RequestGetDto {
  private Set<CommentGetDto> comments;

  public Set<CommentGetDto> getComments() {
    return comments;
  }

  public void setComments(Set<CommentGetDto> comments) {
    this.comments = comments;
  }

  @Override
  public boolean equals(Object object) {
    if (this == object) {
      return true;
    }
    if (!(object instanceof RequestGetDtoWithComments)) {
      return false;
    }
    if (!super.equals(object)) {
      return false;
    }
    final RequestGetDtoWithComments that = (RequestGetDtoWithComments) object;
    return Objects.equals(comments, that.comments);
  }

  @Override
  public int hashCode() {
    return Objects.hash(super.hashCode(), comments);
  }
}
