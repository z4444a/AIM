package ru.relex.aim.service.converter;

import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;
import ru.relex.aim.service.model.base.ProjectStatusDto;


/**
 * Converts a string representation of {@link ProjectStatusDto} to enum.
 *
 * @author Alimov Alexey
 */
@Component
public class ProjectStatusConverter implements Converter<String, ProjectStatusDto> {

  /**
   * Converts a string representation of {@link ProjectStatusDto} to enum.
   *
   * @param source name representation of enum.
   * @return will be null if no match is found.
   */
  @Override
  public ProjectStatusDto convert(String source) {
    return ProjectStatusDto.fromValue(source);
  }
}
