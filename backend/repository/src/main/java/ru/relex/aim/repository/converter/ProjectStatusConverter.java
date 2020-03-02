package ru.relex.aim.repository.converter;

import ru.relex.aim.repository.entity.ProjectStatus;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;
import java.util.Objects;

/**
 * {@link AttributeConverter} implementation for project status.
 *
 * @author Sorokin Georgy
 */
@Converter(autoApply = true)
public class ProjectStatusConverter implements AttributeConverter<ProjectStatus, Integer> {

  @Override
  public Integer convertToDatabaseColumn(ProjectStatus attribute) {
    Objects.requireNonNull(attribute, "Status cannot be null set");
    return attribute.getId();

  }

  @Override
  public ProjectStatus convertToEntityAttribute(Integer dbData) {
    Objects.requireNonNull(dbData, "Status cannot be null set");
    return ProjectStatus.fromId(dbData);
  }
}
