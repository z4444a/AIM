package ru.relex.aim.service.service.impl;

import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.relex.aim.commons.EntityType;
import ru.relex.aim.commons.modifier.ParameterModifier;
import ru.relex.aim.repository.entity.Parameter;
import ru.relex.aim.repository.repository.ParameterRepository;
import ru.relex.aim.repository.repository.ParameterValueRepository;
import ru.relex.aim.repository.repository.PoolParameterValueRepository;
import ru.relex.aim.service.filter.ParameterFilterParam;
import ru.relex.aim.service.mapper.IParameterMapper;
import ru.relex.aim.service.model.create.ParameterCreateDto;
import ru.relex.aim.service.model.get.ParameterGetDto;
import ru.relex.aim.service.service.IParameterService;
import ru.relex.aim.service.validation.annotation.EntityExists;
import ru.relex.aim.service.validation.annotation.ParameterIdentifierSyntax;

import javax.validation.Valid;
import java.util.List;
import java.util.Map;

/**
 * Manages {@link ru.relex.aim.repository.entity.ResourceType}.
 *
 * @author Alexey Alimov
 */
@Service
@Transactional
public class ParameterServiceImpl implements IParameterService {

  private final ParameterRepository parameterRepository;
  private final IParameterMapper mapper;
  private final ParameterValueRepository requestValueRepository;
  private final PoolParameterValueRepository poolValueRepository;

  /**
   * Constructor.
   */
  public ParameterServiceImpl(ParameterRepository parameterRepository,
                              IParameterMapper mapper,
                              ParameterValueRepository requestValueRepository,
                              PoolParameterValueRepository poolValueRepository) {
    this.parameterRepository = parameterRepository;
    this.mapper = mapper;
    this.requestValueRepository = requestValueRepository;
    this.poolValueRepository = poolValueRepository;
  }

  /**
   * {@inheritDoc}
   */
  @Override
  public List<ParameterGetDto> getAll(Map<ParameterFilterParam, Object> filter) {

    final var spec = filter
        .entrySet()
        .stream()
        .map((x) -> x.getKey().makeSpec(x.getValue()))
        .reduce((aggregated, item) -> aggregated.and(item))
        .orElse(null);
    final Sort sort = new Sort(Sort.Direction.ASC, "order");
    final List<Parameter> parameters = parameterRepository.findAll(spec, sort);
    return mapper.toGetDto(parameters);
  }

  /**
   * {@inheritDoc}
   */
  @Override
  public ParameterGetDto create(@Valid ParameterCreateDto parameterCreateDto) {
    final Parameter parameter = mapper.fromCreateDto(parameterCreateDto);
    return mapper.toGetDto(parameterRepository.saveAndRefresh(parameter));
  }

  /**
   * {@inheritDoc}
   */
  @Override
  public Boolean isUsed(@EntityExists(entityType = EntityType.PARAMETER) Integer id) {
    return poolValueRepository.existsByParameterId(id)
        || requestValueRepository.existsByParameterId(id);
  }

  /**
   * {@inheritDoc}
   */
  @Override
  public Boolean isIdentifierUsed(@ParameterIdentifierSyntax String identifier,
                                  ParameterModifier modifier,
                                  Integer id) {

    if (identifier == null || identifier.isBlank()) {
      return false;
    }
    final var parameter = parameterRepository.findByIdentifierAndModifier(identifier, modifier);
    if (parameter == null) {
      return false;
    }
    if (id != null) {
      return !parameter.getId().equals(id);
    }
    return true;
  }
}
