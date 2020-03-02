package ru.relex.aim.repository.entity;

/**
 * Represents information for displaying suggestions.
 */
public interface NamedEntity {
  /**
   * Accessor method for the property id to be read from database.
   */
  Integer getId();

  /**
   * Accessor method for the property name to be read from database.
   */
  String getName();
}
