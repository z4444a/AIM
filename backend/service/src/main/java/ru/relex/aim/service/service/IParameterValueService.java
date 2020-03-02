package ru.relex.aim.service.service;

import ru.relex.aim.repository.entity.RequestParameterValue;
import ru.relex.aim.service.model.get.RequestParameterValueGetDto;

import java.util.List;

/**
 * Manages {@link RequestParameterValue}.
 */
public interface IParameterValueService {

  /**
   * Finds parameter values by given request identifier.
   * @return list of parameter value dto
   */
  List<RequestParameterValueGetDto> getValuesByRequestId(Integer requestId);
}
