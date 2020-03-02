package ru.relex.aim.service.converter;

import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;
import ru.relex.aim.service.sort.RequestSort;

/**
 * Converts a string representation of
 * {@link ru.relex.aim.repository.entity.Request} to enum.
 *
 * @author Alexey Alimov
 */
@Component
public class RequestSortConverter implements Converter<String, RequestSort> {

  @Override
  public RequestSort convert(String source) {
    return RequestSort.fromValue(source);
  }
}
