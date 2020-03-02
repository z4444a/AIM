package ru.relex.aim.service.converter;

import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;
import ru.relex.aim.service.sort.SortingOrder;

/**
 * Converts a string representation of {@link SortingOrder} to enum.
 *
 * @author Alexey Alimov
 */
@Component
public class SortingOrderConverter implements Converter<String, SortingOrder> {

  /**
   * Converts a string representation of {@link SortingOrder} to enum.
   *
   * @author Alexey Alimov
   * @param source a string representation of enum.
   * @return will never be null.
   */
  @Override
  public SortingOrder convert(String source) {
    return SortingOrder.fromValue(source);
  }
}
