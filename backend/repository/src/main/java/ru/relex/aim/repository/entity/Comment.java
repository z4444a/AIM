package ru.relex.aim.repository.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import java.time.Instant;
import java.util.Objects;

/**
 * Represents a request comment.
 */
@Entity
@Table(name = "comments", schema = "aim")
public class Comment {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "comment_id", updatable = false)
  private Integer id;

  @Column(name = "datetime", nullable = false, updatable = false, insertable = false)
  private Instant datetime;

  @Column(name = "content", nullable = false)
  private String content;

  @ManyToOne
  @JoinColumn(name = "request_id", nullable = false)
  private Request request;

  @ManyToOne
  @JoinColumn(name = "employee_id", nullable = false)
  private Employee author;

  public Integer getId() {
    return id;
  }

  public void setId(Integer id) {
    this.id = id;
  }

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

  public Request getRequest() {
    return request;
  }

  public void setRequest(Request request) {
    this.request = request;
  }

  public Employee getAuthor() {
    return author;
  }

  public void setAuthor(Employee author) {
    this.author = author;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (!(o instanceof Comment)) {
      return false;
    }
    final Comment comment = (Comment) o;
    return Objects.equals(id, comment.id)
        && Objects.equals(datetime, comment.datetime)
        && Objects.equals(content, comment.content)
        && Objects.equals(request.getId(), comment.request.getId())
        && Objects.equals(author.getId(), comment.author.getId());
  }

  @Override
  public int hashCode() {
    return Objects.hash(id, datetime, content, request.getId(), author.getId());
  }
}
