package ru.relex.aim.service.model.get;

import java.util.Objects;

/**
 * Data class for displaying the amount of resource type.
 *
 * @author Nastya Zinchenko
 */
public class AmountTypes {

  private final int id;
  private final String name;
  private final int amount;

  /**
   * Constructor.
   */
  public AmountTypes(int id, String name, int amount) {
    this.id = id;
    this.name = name;
    this.amount = amount;
  }

  public int getId() {
    return id;
  }

  public String getName() {
    return name;
  }

  public int getAmount() {
    return amount;
  }

  @Override
  public boolean equals(Object object) {
    if (this == object) {
      return true;
    }
    if (!(object instanceof AmountTypes)) {
      return false;
    }
    final AmountTypes that = (AmountTypes) object;
    return id == that.id
        && amount == that.amount
        && Objects.equals(name, that.name);
  }

  @Override
  public int hashCode() {
    return Objects.hash(id, name, amount);
  }
}
