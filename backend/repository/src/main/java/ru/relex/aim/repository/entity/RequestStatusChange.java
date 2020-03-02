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
 * Represents a request status change processed by the system.
 */
@Entity
@Table(name = "request_status_changes", schema = "aim")
public class RequestStatusChange {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id")
  private Integer id;

  @Column(name = "status_id", nullable = false)
  private RequestStatus status;

  @ManyToOne
  @JoinColumn(name = "request_id", nullable = false)
  private Request request;

  @ManyToOne
  @JoinColumn(name = "author_id", nullable = false)
  private Employee author;

  @Column(name = "datetime", nullable = false, updatable = false, insertable = false)
  private Instant datetime;

  public Integer getId() {
    return id;
  }

  public void setId(Integer id) {
    this.id = id;
  }

  public RequestStatus getStatus() {
    return status;
  }

  public void setStatus(RequestStatus status) {
    this.status = status;
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

  public Instant getDatetime() {
    return datetime;
  }

  public void setDatetime(Instant datetime) {
    this.datetime = datetime;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (!(o instanceof RequestStatusChange)) {
      return false;
    }
    final RequestStatusChange that = (RequestStatusChange) o;
    return Objects.equals(id, that.id)
        && status == that.status
        && Objects.equals(request.getId(), that.request.getId())
        && Objects.equals(author.getId(), that.author.getId())
        && Objects.equals(datetime, that.datetime);
  }

  @Override
  public int hashCode() {
    final var requestId = request == null ? null : request.getId();
    final var authorId = author == null ? null : author.getId();
    return Objects.hash(id, status, requestId, authorId, datetime);
  }
}
