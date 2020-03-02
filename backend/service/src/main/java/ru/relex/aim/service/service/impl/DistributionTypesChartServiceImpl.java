package ru.relex.aim.service.service.impl;

import org.springframework.stereotype.Service;
import ru.relex.aim.repository.entity.Chart;
import ru.relex.aim.repository.repository.ResourcePoolRepository;
import ru.relex.aim.service.model.get.AmountTypes;
import ru.relex.aim.service.model.get.DistributionTypesChartDto;
import ru.relex.aim.service.service.IDistributionTypesChartService;

import java.util.ArrayList;
import java.util.List;

/**
 * Implementation of {@link IDistributionTypesChartService}.
 *
 * @author Nastya Zinchenko
 */
@Service
public class DistributionTypesChartServiceImpl implements IDistributionTypesChartService {

  private final ResourcePoolRepository repository;

  /**
   * Constructor.
   */
  public DistributionTypesChartServiceImpl(ResourcePoolRepository repository) {
    this.repository = repository;
  }

  /**
   * {@inheritDoc}
   */
  @Override
  public List<DistributionTypesChartDto> getChart(int[] owners, int[] resourceTypes) {
    final List<DistributionTypesChartDto> result = new ArrayList<>();
    final List<Chart> data = repository.getDataToChart(owners, resourceTypes);

    int currentOwnerId = -1;
    for (final Chart item : data) {
      final AmountTypes amountType = constructAmountType(item.getTypeId(), item.getTypeName(), item.getAmount());
      if (item.getOwnerId() == currentOwnerId) {
        final List<AmountTypes> currentList = result.get(result.size() - 1).getAmountTypes();
        currentList.add(amountType);
        result.get(result.size() - 1).setAmountTypes(currentList);
      } else {
        final List<AmountTypes> amountTypes = List.of(amountType);
        result.add(constructDistributionType(item.getOwnerId(), item.getOwnerName(), amountTypes));
        currentOwnerId = item.getOwnerId();
      }
    }
    return result;
  }

  private AmountTypes constructAmountType(int id, String name, int amount) {
    return new AmountTypes(id, name, amount);
  }

  private DistributionTypesChartDto constructDistributionType(int id, String name, List<AmountTypes> amountTypes) {
    return new DistributionTypesChartDto(id, name, amountTypes);
  }
}
