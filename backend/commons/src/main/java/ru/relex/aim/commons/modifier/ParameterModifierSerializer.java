package ru.relex.aim.commons.modifier;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.ser.std.StdSerializer;

import java.io.IOException;

/**
 * {@inheritDoc}
 */
public class ParameterModifierSerializer extends StdSerializer<ParameterModifier> {
  private static final long serialVersionUID = -6602846498190615287L;

  /**
   * Constructor.
   */
  public ParameterModifierSerializer() {
    super(ParameterModifier.class);
  }


  /**
   * Serializes the instance of {@link ParameterModifier} to json number field.
   * {@inheritDoc}
   */
  @Override
  public void serialize(ParameterModifier value, JsonGenerator gen, SerializerProvider provider) throws IOException {
    gen.writeNumber(value.getId());
  }
}
