package ru.relex.aim.commons.modifier;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.deser.std.StdDeserializer;

import java.io.IOException;

/**
 * {@inheritDoc}
 */
public class ParameterModifierDeserializer extends StdDeserializer<ParameterModifier> {
  private static final long serialVersionUID = -6602846498190615287L;

  /**
   * Constructor.
   */
  public ParameterModifierDeserializer() {
    super(ParameterModifier.class);
  }


  /**
   * Converts a number field value from json to the instance of {@link ParameterModifier}.
   * {@inheritDoc}
   */
  @Override
  public ParameterModifier deserialize(JsonParser parser, DeserializationContext ctxt) throws IOException {
    final int id = parser.getIntValue();
    return ParameterModifier.fromId(id);
  }
}
