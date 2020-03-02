package ru.relex.aim.service.converter;

import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;
import ru.relex.aim.service.sort.EmployeeSort;

/**
 * Converts a string representation of {@link EmployeeSort} to enum.
 *
 * @author Sorokin Georgy
 */
@Component
public class EmployeeSortConverter implements Converter<String, EmployeeSort> {
  /**
   * Converts a string representation of {@link EmployeeSort} to enum.
   *
   * @param source name representation of enum.
   * @return will be null if no match is found.
   */
  @Override
  public EmployeeSort convert(String source) {
    return EmployeeSort.fromValue(source);
  }
}
