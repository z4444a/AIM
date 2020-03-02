package ru.relex.aim.service.model.get;

import java.util.List;
import java.util.Objects;

/**
 * Data class for displaying the amount of each resource type for owner.
 *
 * @author Nastya Zinchenko
 */
public class DistributionTypesChartDto {

  private final int id;
  private final String name;
  private List<AmountTypes> amountTypes;

  /**
   * Constructor.
   */
  public DistributionTypesChartDto(int id, String name, List<AmountTypes> amountTypes) {
    this.id = id;
    this.name = name;
    this.amountTypes = amountTypes;
  }

  public int getId() {
    return id;
  }

  public String getName() {
    return name;
  }

  public List getAmountTypes() {
    return amountTypes;
  }

  public void setAmountTypes(List<AmountTypes> amountTypes) {
    this.amountTypes = amountTypes;
  }

  @Override
  public boolean equals(Object object) {
    if (this == object) {
      return true;
    }
    if (!(object instanceof DistributionTypesChartDto)) {
      return false;
    }
    final DistributionTypesChartDto that = (DistributionTypesChartDto) object;
    return id == that.id
        && Objects.equals(name, that.name)
        && Objects.equals(amountTypes, that.amountTypes);
  }

  @Override
  public int hashCode() {
    return Objects.hash(id, name, amountTypes);
  }
}
