package ru.relex.aim.repository.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OrderBy;
import javax.persistence.Table;
import java.time.Instant;
import java.time.LocalDate;
import java.util.Objects;
import java.util.Set;

/**
 * Represents a request for a resource to be allocated.
 *
 * @author Alexey Alimov
 */
@Entity
@Table(name = "requests", schema = "aim")
public class Request {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "request_id", updatable = false)
  private Integer id;

  @Column(name = "datetime_creation", nullable = false, updatable = false, insertable = false)
  private Instant creation;

  @Column(name = "date_start_using")
  private LocalDate usageStart;

  @Column(name = "date_finish_using")
  private LocalDate usageFinish;

  @Column(name = "description")
  private String description;

  @Column(name = "need_backup", nullable = false)
  private Boolean needsBackup;

  @Column(name = "amount", nullable = false)
  private int amount;

  @Column(name = "state_id", nullable = false)
  private RequestState state;

  @ManyToOne
  @JoinColumn(name = "author_id", updatable = false)
  private Employee author;

  @ManyToOne
  @JoinColumn(name = "created_by_id", updatable = false)
  private Employee createdBy;

  @ManyToOne
  @JoinColumn(name = "responsive_id")
  private Employee owner;

  @ManyToOne
  @JoinColumn(name = "project_id")
  private Project project;

  @ManyToOne
  @JoinColumn(name = "category_id", nullable = false)
  private ResourceType type;

  @Column(name = "status_id")
  private RequestStatus status;

  @ManyToOne
  @JoinColumn(name = "resource_pools_id")
  private ResourcePool pool;

  @OneToMany(mappedBy = "request")
  @OrderBy("order ASC")
  private Set<RequestParameterValue> requestParameterValues;

  @OneToMany(mappedBy = "request")
  private Set<Comment> comments;

  //region Getters
  public Integer getId() {
    return id;
  }

  public Instant getCreation() {
    return creation;
  }

  public LocalDate getUsageStart() {
    return usageStart;
  }

  public LocalDate getUsageFinish() {
    return usageFinish;
  }

  public String getDescription() {
    return description;
  }

  public Boolean getNeedsBackup() {
    return needsBackup;
  }

  public RequestState getState() {
    return state;
  }

  public ResourceType getType() {
    return type;
  }

  public RequestStatus getStatus() {
    return status;
  }

  public ResourcePool getPool() {
    return pool;
  }

  public Employee getAuthor() {
    return author;
  }

  public Employee getCreatedBy() {
    return createdBy;
  }

  public Project getProject() {
    return project;
  }

  public Employee getOwner() {
    return owner;
  }

  public Set<RequestParameterValue> getRequestParameterValues() {
    return requestParameterValues;
  }
  //endregion

  //region Setters
  public void setId(Integer id) {
    this.id = id;
  }

  public void setCreation(Instant creation) {
    this.creation = creation;
  }

  public void setUsageStart(LocalDate usageStart) {
    this.usageStart = usageStart;
  }

  public void setUsageFinish(LocalDate usageFinish) {
    this.usageFinish = usageFinish;
  }

  public void setDescription(String description) {
    this.description = description;
  }

  public void setNeedsBackup(Boolean needsBackup) {
    this.needsBackup = needsBackup;
  }

  public void setState(RequestState state) {
    this.state = state;
  }

  public void setType(ResourceType type) {
    this.type = type;
  }

  public void setStatus(RequestStatus status) {
    this.status = status;
  }

  public void setPool(ResourcePool pool) {
    this.pool = pool;
  }

  public void setAuthor(Employee author) {
    this.author = author;
  }

  public void setCreatedBy(Employee createdBy) {
    this.createdBy = createdBy;
  }

  public void setProject(Project project) {
    this.project = project;
  }

  public void setOwner(Employee owner) {
    this.owner = owner;
  }

  public void setRequestParameterValues(Set<RequestParameterValue> requestParameterValues) {
    this.requestParameterValues = requestParameterValues;
  }

  public int getAmount() {
    return amount;
  }

  public void setAmount(int amount) {
    this.amount = amount;
  }

  public Set<Comment> getComments() {
    return comments;
  }

  public void setComments(Set<Comment> comments) {
    this.comments = comments;
  }
  //endregion


  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (!(o instanceof Request)) {
      return false;
    }
    final Request request = (Request) o;
    return amount == request.amount
        && Objects.equals(id, request.id)
        && Objects.equals(creation, request.creation)
        && Objects.equals(usageStart, request.usageStart)
        && Objects.equals(usageFinish, request.usageFinish)
        && Objects.equals(description, request.description)
        && Objects.equals(needsBackup, request.needsBackup)
        && state == request.state
        && Objects.equals(author.getId(), request.author.getId())
        && Objects.equals(createdBy.getId(), request.createdBy.getId())
        && Objects.equals(owner.getId(), request.owner.getId())
        && Objects.equals(project, request.project)
        && Objects.equals(type.getId(), request.type.getId())
        && status == request.status
        && Objects.equals(pool, request.pool);
  }

  @Override
  public int hashCode() {
    final var authorId = author == null ? null : author.getId();
    final var createdById = createdBy == null ? null : createdBy.getId();
    final var ownerId = owner == null ? null : owner.getId();
    final var typeId = type == null ? null : type.getId();
    return Objects.hash(id, creation, usageStart, usageFinish, description,
        needsBackup, amount, state, authorId, createdById, ownerId, project, typeId, status, pool);
  }
}
