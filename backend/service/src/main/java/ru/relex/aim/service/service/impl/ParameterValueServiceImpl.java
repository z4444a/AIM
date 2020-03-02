package ru.relex.aim.service.service.impl;

import org.springframework.stereotype.Service;
import ru.relex.aim.repository.repository.ParameterValueRepository;
import ru.relex.aim.service.mapper.RequestParameterValueMapper;
import ru.relex.aim.service.model.get.RequestParameterValueGetDto;
import ru.relex.aim.service.service.IParameterValueService;

import java.util.List;

/**
 * {@inheritDoc}
 */
@Service
public class ParameterValueServiceImpl implements IParameterValueService {
  private final RequestParameterValueMapper valueMapper;
  private final ParameterValueRepository valueRepository;

  /**
   * Constructor.
   */
  public ParameterValueServiceImpl(RequestParameterValueMapper valueMapper, ParameterValueRepository valueRepository) {
    this.valueMapper = valueMapper;
    this.valueRepository = valueRepository;
  }

  /**
   * {@inheritDoc}
   */
  @Override
  public List<RequestParameterValueGetDto> getValuesByRequestId(Integer requestId) {
    return valueMapper.toGetDto(valueRepository.findAllByRequestId(requestId));
  }
}
