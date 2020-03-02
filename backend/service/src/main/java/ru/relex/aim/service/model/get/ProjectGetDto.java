package ru.relex.aim.service.model.get;

import ru.relex.aim.service.model.base.BaseDto;
import ru.relex.aim.service.model.base.ProjectStatusDto;

import java.util.Objects;

/**
 * DTO transfer class for {@link ru.relex.aim.repository.entity.Project}
 * Used for fetching information to client.
 *
 * @author Alexey Alimov
 */
public class ProjectGetDto extends BaseDto {

  private String name;
  private ProjectStatusDto status;

  //region Getters and setters.
  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public ProjectStatusDto getStatus() {
    return status;
  }

  public void setStatus(ProjectStatusDto status) {
    this.status = status;
  }
  //endregion

  @Override
  public boolean equals(Object object) {
    if (this == object) {
      return true;
    }
    if (!(object instanceof ProjectGetDto)) {
      return false;
    }
    final ProjectGetDto that = (ProjectGetDto) object;
    return Objects.equals(name, that.name)
        && status == that.status;
  }

  @Override
  public int hashCode() {
    return Objects.hash(name, status);
  }
}
