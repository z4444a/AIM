package ru.relex.aim.service.model.get;

import ru.relex.aim.repository.entity.RequestStatus;

import java.util.Arrays;
import java.util.Objects;

/**
 * Extends {@link ResourceTypeGetDto} by number of pools and requests.
 */
public class ResourceTypeRowGetDto extends ResourceTypeGetDto {

  private Integer numberOfPools;
  private Integer[] numberOfRequests = new Integer[RequestStatus.values().length];

  public Integer getNumberOfPools() {
    return numberOfPools;
  }

  public void setNumberOfPools(Integer numberOfPools) {
    this.numberOfPools = numberOfPools;
  }

  public Integer[] getNumberOfRequests() {
    return numberOfRequests.clone();
  }

  @Override
  public boolean equals(Object object) {
    if (this == object) {
      return true;
    }
    if (!(object instanceof ResourceTypeRowGetDto)) {
      return false;
    }
    if (!super.equals(object)) {
      return false;
    }
    final ResourceTypeRowGetDto that = (ResourceTypeRowGetDto) object;
    return Objects.equals(numberOfPools, that.numberOfPools)
        && Arrays.equals(numberOfRequests, that.numberOfRequests);
  }

  @Override
  public int hashCode() {
    int result = Objects.hash(super.hashCode(), numberOfPools);
    result = 31 * result + Arrays.hashCode(numberOfRequests);
    return result;
  }

  /**
   * Adds number of requests with received status to the array.
   */
  public void add(RequestStatus status, Integer count) {
    numberOfRequests[status.getId() - 1] = count;
  }
}
