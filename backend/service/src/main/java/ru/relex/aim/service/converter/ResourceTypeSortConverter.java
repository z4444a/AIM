package ru.relex.aim.service.converter;

import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;
import ru.relex.aim.service.sort.ResourceTypeSort;

/**
 * Converts a string representation of {@link ResourceTypeSort} to enum.
 *
 * @author Alexey Alimov
 */
@Component
public class ResourceTypeSortConverter implements Converter<String, ResourceTypeSort> {

  /**
   * Converts a string representation of {@link ResourceTypeSort} to enum.
   *
   * @param source name representation of enum.
   * @return will be null if no match is found.
   */
  @Override
  public ResourceTypeSort convert(String source) {
    return ResourceTypeSort.fromValue(source);
  }
}
