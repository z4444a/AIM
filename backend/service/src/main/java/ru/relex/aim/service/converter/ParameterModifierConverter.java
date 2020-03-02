package ru.relex.aim.service.converter;

import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;
import ru.relex.aim.commons.modifier.ParameterModifier;

/**
 * Converts a number request param to the instance of enum {@link ParameterModifier}.
 */
@Component
public class ParameterModifierConverter implements Converter<String, ParameterModifier> {

  /**
   * {@inheritDoc}
   */
  @Override
  public ParameterModifier convert(String source) {
    return ParameterModifier.fromId(Integer.parseInt(source));
  }
}
