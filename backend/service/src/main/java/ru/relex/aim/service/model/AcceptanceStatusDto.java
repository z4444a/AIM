package ru.relex.aim.service.model;

/**
 * Keeps approving request response.
 *
 * @author Sorokin Georgy
 */
public class AcceptanceStatusDto {
  private final boolean capacityEnough;

  /**
   * Constructor.
   *
   * @param isCapacityEnough true, if current user has a pool
   *                         which has an enough capacity to approve request
   */
  public AcceptanceStatusDto(boolean isCapacityEnough) {
    this.capacityEnough = isCapacityEnough;
  }

  public boolean isCapacityEnough() {
    return capacityEnough;
  }
}
