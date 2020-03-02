package ru.relex.aim.service.service.impl;

import java.util.List;
import org.springframework.stereotype.Service;
import ru.relex.aim.repository.entity.ListValue;
import ru.relex.aim.repository.repository.ListValueRepository;
import ru.relex.aim.service.mapper.IListValueMapper;
import ru.relex.aim.service.model.get.ListValueGetDto;
import ru.relex.aim.service.service.IListValueService;

/**
 * {@inheritDoc}
 */
@Service
public class ListValueServiceImpl implements IListValueService {

  private final ListValueRepository repository;
  private final IListValueMapper mapper;

  /**
   * Constructor.
   */
  public ListValueServiceImpl(ListValueRepository repository, IListValueMapper mapper) {
    this.repository = repository;
    this.mapper = mapper;
  }

  /**
   * {@inheritDoc}
   */
  @Override
  public List<ListValueGetDto> getAllByParameterId(int parameterId) {
    final List<ListValue> listValues = repository.findAllByParameterId(parameterId);
    return mapper.toGetDto(listValues);
  }
}
