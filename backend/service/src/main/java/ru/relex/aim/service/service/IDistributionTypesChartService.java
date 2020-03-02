
package ru.relex.aim.service.service;

import ru.relex.aim.service.model.get.DistributionTypesChartDto;

import java.util.List;

/**
 * Manages {@link ru.relex.aim.repository.entity.Chart}.
 *
 * @author Nastya Zinchenko
 */
public interface IDistributionTypesChartService {

  /**
   * Returns all full names of instances of{@link ru.relex.aim.repository.entity.Employee}.
   *
   * @return all instances.
   */
  List<DistributionTypesChartDto> getChart(int[] owners, int[] resourceTypes);
}
