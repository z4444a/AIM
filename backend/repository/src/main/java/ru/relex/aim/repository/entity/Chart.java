package ru.relex.aim.repository.entity;

/**
 * Represents an information for displaying resource types distribution chart.
 *
 * @author Nastya Zinchenko
 */
public interface Chart {

  /**
   * Accessor method for the property ownerId to be read from database.
   */
  int getOwnerId();

  /**
   * Accessor method for the property ownerName to be read from database.
   */
  String getOwnerName();

  /**
   * Accessor method for the property typeId to be read from database.
   */
  int getTypeId();

  /**
   * Accessor method for the property typeName to be read from database.
   */
  String getTypeName();

  /**
   * Accessor method for the property amount to be read from database.
   */
  int getAmount();
}
