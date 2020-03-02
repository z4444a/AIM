package ru.relex.aim.service.service.impl;

import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.annotation.Validated;
import ru.relex.aim.repository.entity.RequestStatus;
import ru.relex.aim.repository.entity.ResourceType;
import ru.relex.aim.repository.repository.RequestRepository;
import ru.relex.aim.repository.repository.ResourcePoolRepository;
import ru.relex.aim.repository.repository.ResourceTypeRepository;
import ru.relex.aim.service.filter.ResourceTypeFilterParams;
import ru.relex.aim.service.mapper.IResourceTypeMapper;
import ru.relex.aim.service.model.base.PageModel;
import ru.relex.aim.service.model.create.ResourceTypeCreateDto;
import ru.relex.aim.service.model.get.ResourceTypeGetDto;
import ru.relex.aim.service.model.get.ResourceTypeRowGetDto;
import ru.relex.aim.service.model.update.ResourceTypeUpdateDto;
import ru.relex.aim.service.service.IResourceTypeService;
import ru.relex.aim.service.sort.ResourceTypeSort;
import ru.relex.aim.service.sort.SortingOrder;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import java.util.List;
import java.util.Map;
import java.util.function.Consumer;


/**
 * Manages {@link ru.relex.aim.repository.entity.ResourceType}.
 *
 * @author Alexey Alimov
 */
@Validated
@Service
@Transactional
public class ResourceTypeServiceImpl implements IResourceTypeService {

  private final ResourceTypeRepository repository;
  private final IResourceTypeMapper mapper;
  private final RequestRepository requestRepository;
  private final ResourcePoolRepository poolRepository;

  /**
   * Constructor.
   */
  public ResourceTypeServiceImpl(ResourceTypeRepository repository, IResourceTypeMapper mapper,
                                 RequestRepository requestRepository, ResourcePoolRepository poolRepository) {
    this.repository = repository;
    this.mapper = mapper;
    this.requestRepository = requestRepository;
    this.poolRepository = poolRepository;
  }

  /**
   * Returns a page of {@link ru.relex.aim.repository.entity.ResourceType}
   * instances and applies the given filter and sorting order.
   *
   * @param filter   Filter object. May be null
   * @param sortBy   Column name by which to sort. May never be null
   * @param order    Sorting order. May never be null.
   * @param page     page number.
   * @param pageSize amount of elements to return in a page.
   * @return all instances with applied filter. Will never be null.
   * @author Alexey Alimov
   */
  @Override
  public PageModel<ResourceTypeRowGetDto> getAll(Map<ResourceTypeFilterParams, Object> filter,
                                                 @NotNull ResourceTypeSort sortBy, @NotNull SortingOrder order,
                                                 int page, int pageSize) {

    final var spec = filter
        .entrySet()
        .stream()
        .map(x -> x.getKey().makeSpec(x.getValue()))
        .reduce((aggregated, item) -> aggregated.and(item))
        .orElse(null);

    final var sort = Sort.by(order.getDirection(), sortBy.getColumnName());
    final var pageRequest = PageRequest.of(page, pageSize, sort);

    final var resourceTypesPage = repository.findAll(spec, pageRequest);
    final var getDto = mapper.toRowDto(resourceTypesPage.getContent());
    getDto.forEach(this::constructExtendedDto);
    return new PageModel<>(getDto, resourceTypesPage.getTotalElements(), page);
  }

  /**
   * Returns a DTO of {@link ru.relex.aim.repository.entity.ResourceType} by the given identifier.
   *
   * @param id identifier by which to find.
   * @return DTO if found. Null otherwise.
   */
  @Override
  public ResourceTypeGetDto get(int id) {
    final ResourceType resourceType = repository.findById(id).orElse(null);
    return mapper.toGetDto(resourceType);
  }

  /**
   * {@inheritDoc}
   */
  @Override
  public List<ResourceTypeGetDto> getActiveList() {
    return mapper.toGetDto(repository.findByActive(true));
  }

  /**
   * {@inheritDoc}
   */
  @Override
  @Transactional
  public ResourceTypeGetDto create(@Valid ResourceTypeCreateDto dto) {
    ResourceType resourceType = mapper.fromCreateDto(dto);
    resourceType = repository.saveAndRefresh(resourceType);
    return mapper.toGetDto(resourceType);
  }

  /**
   * {@inheritDoc}
   */
  @Override
  @Transactional
  public ResourceTypeGetDto update(@Valid ResourceTypeUpdateDto dto) {
    ResourceType resourceType = mapper.fromUpdateDto(dto);
    resourceType = repository.saveAndRefresh(resourceType);
    return mapper.toGetDto(resourceType);
  }

  /**
   * {@inheritDoc}
   */
  @Override
  public boolean existsByName(String name) {
    final ResourceType type = new ResourceType();
    type.setName(name);
    final ExampleMatcher matcher = ExampleMatcher.matching()
        .withIgnorePaths("id", "description", "quantitative", "needsBackup", "active", "picture", "parameters")
        .withIgnoreCase();
    return repository.exists(Example.of(type, matcher));
  }

  private void constructExtendedDto(ResourceTypeRowGetDto type) {
    final var id = type.getId();
    type.setNumberOfPools(poolRepository.countAllByResourceTypeId(id));
    final Consumer<RequestStatus> numberOfRequests = status ->
        type.add(status, requestRepository.countAllByTypeIdAndStatus(id, status));
    for (final var status : RequestStatus.values()) {
      numberOfRequests.accept(status);
    }
  }
}
