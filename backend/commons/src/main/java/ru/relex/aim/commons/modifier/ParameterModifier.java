package ru.relex.aim.commons.modifier;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

/**
 * Represents a parameter field which manages visibility and setting opportunity.
 *
 * @author Sorokin Georgy
 */
@JsonSerialize(using = ParameterModifierSerializer.class)
@JsonDeserialize(using = ParameterModifierDeserializer.class)
public enum ParameterModifier {

  POOL_PARAMETER(1),
  REQUEST_PARAMETER(2),
  ALLOCATION_PARAMETER(3);

  private final int id;

  ParameterModifier(int id) {
    this.id = id;
  }

  public int getId() {
    return id;
  }

  /**
   * Tries to parse given id into {@link ParameterModifier} instance.
   *
   * @param id to find matching modifier
   * @return parameter modifier with matching id or {@literal null}.
   */
  public static ParameterModifier fromId(final int id) {
    for (final var value : values()) {
      if (value.id == id) {
        return value;
      }
    }
    return null;
  }
}
