package ru.relex.aim.service.model.base;

/**
 * Base data class for DTOs with {@code content} field.
 *
 * @author Nastya Zinchenko
 */
public class ContentDto extends BaseDto {
  private String content;

  public String getContent() {
    return content;
  }

  public void setContent(String content) {
    this.content = content;
  }
}
