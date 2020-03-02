package ru.relex.aim.service.model.base;

import java.util.List;

/**
 * Represents a page that is returned to client.
 *
 * @param <T> type of content inside the page.
 */
public class PageModel<T extends BaseDto> {
  private List<T> content;
  private Long totalElements;
  private Integer page;

  /**
   * Constructor.
   */
  public PageModel(List<T> content, Long totalElements, Integer page) {
    this.content = content;
    this.totalElements = totalElements;
    this.page = page;
  }

  public List<T> getContent() {
    return content;
  }

  public void setContent(List<T> content) {
    this.content = content;
  }

  public Long getTotalElements() {
    return totalElements;
  }

  public void setTotalElements(Long totalElements) {
    this.totalElements = totalElements;
  }

  public Integer getPage() {
    return page;
  }

  public void setPage(Integer page) {
    this.page = page;
  }
}
