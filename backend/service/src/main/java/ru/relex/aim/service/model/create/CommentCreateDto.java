package ru.relex.aim.service.model.create;

/**
 * DTO creating class for {@link ru.relex.aim.repository.entity.Comment}
 * Used for creating new instance from client data.
 *
 * @author Sorokin Georgy
 */
public class CommentCreateDto {

  private Integer authorId;

  private Integer requestId;

  private String content;

  public Integer getAuthorId() {
    return authorId;
  }

  public void setAuthorId(Integer authorId) {
    this.authorId = authorId;
  }

  public String getContent() {
    return content;
  }

  public void setContent(String content) {
    this.content = content;
  }

  public Integer getRequestId() {
    return requestId;
  }

  public void setRequestId(Integer requestId) {
    this.requestId = requestId;
  }
}
