package ru.relex.aim.service.converter;

import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;
import ru.relex.aim.service.sort.ResourcePoolSort;

/**
 * Converts a string representation of {@link ResourcePoolSort} to enum.
 *
 * @author Dmitriy Poshevelya
 */
@Component
public class ResourcePoolSortConverter implements Converter<String, ResourcePoolSort> {

  /**
   * Converts a string representation of {@link ResourcePoolSort} to enum.
   *
   * @return ResourcePool instance with matching source-string or {@code null} if no match found
   */
  @Override
  public ResourcePoolSort convert(String source) {
    return ResourcePoolSort.fromValue(source);
  }
}
