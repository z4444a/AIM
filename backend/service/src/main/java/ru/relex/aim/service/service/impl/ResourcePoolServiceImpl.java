package ru.relex.aim.service.service.impl;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.annotation.Validated;
import ru.relex.aim.repository.entity.Employee;
import ru.relex.aim.repository.entity.GeneralParameterValue;
import ru.relex.aim.repository.entity.RequestStatus;
import ru.relex.aim.repository.entity.ResourcePool;
import ru.relex.aim.repository.repository.ParameterRepository;
import ru.relex.aim.repository.repository.RequestRepository;
import ru.relex.aim.repository.repository.ResourcePoolRepository;
import ru.relex.aim.security.model.AuthUser;
import ru.relex.aim.service.filter.ResourcePoolFilterParams;
import ru.relex.aim.service.mapper.IGeneralParameterValueMapper;
import ru.relex.aim.service.mapper.INamedEntityMapper;
import ru.relex.aim.service.mapper.IResourcePoolMapper;
import ru.relex.aim.service.model.base.PageModel;
import ru.relex.aim.service.model.create.ResourcePoolCreateDto;
import ru.relex.aim.service.model.get.NamedTypedDto;
import ru.relex.aim.service.model.get.ResourcePoolFullGetDto;
import ru.relex.aim.service.model.get.ResourcePoolGetDto;
import ru.relex.aim.service.model.update.ResourcePoolUpdateDto;
import ru.relex.aim.service.service.IEmployeeService;
import ru.relex.aim.service.service.IResourcePoolService;
import ru.relex.aim.service.sort.ResourcePoolSort;
import ru.relex.aim.service.sort.SortingOrder;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * Manages {@link ru.relex.aim.repository.entity.ResourceType}.
 *
 * @author Nastya Zinchenko
 */
@Service
@Validated
public class ResourcePoolServiceImpl implements IResourcePoolService {

  private final ResourcePoolRepository repository;
  private final RequestRepository requestRepository;
  private final ParameterRepository parameterRepository;
  private final IResourcePoolMapper mapper;
  private final AuthUser authUser;
  private final IGeneralParameterValueMapper genParamValueMapper;
  private final IEmployeeService employeeService;
  private final INamedEntityMapper namedEntityMapper;

  /**
   * Constructor.
   */
  public ResourcePoolServiceImpl(ResourcePoolRepository repository, IResourcePoolMapper mapper,
                                 RequestRepository requestRepository, AuthUser authUser,
                                 IGeneralParameterValueMapper genParamValueMapper,
                                 ParameterRepository parameterRepository, IEmployeeService employeeService,
                                 INamedEntityMapper namedEntityMapper) {
    this.repository = repository;
    this.mapper = mapper;
    this.requestRepository = requestRepository;
    this.authUser = authUser;
    this.genParamValueMapper = genParamValueMapper;
    this.parameterRepository = parameterRepository;
    this.employeeService = employeeService;
    this.namedEntityMapper = namedEntityMapper;
  }

  /**
   * {@inheritDoc}
   */
  @Override
  @Transactional
  public ResourcePoolFullGetDto get(Integer id) {
    final var pool = repository.findById(id).orElse(null);
    return mapper.toFullGetDto(pool);
  }

  /**
   * {@inheritDoc}
   */
  @Override
  @Transactional
  public PageModel<ResourcePoolGetDto> getAll(String name, Integer type, Boolean active, Map<String, Object> params,
                                              Boolean onlyMine, ResourcePoolSort sortBy, SortingOrder order,
                                              int page, int pageSize) {
    final var filterMap = ResourcePoolFilterParams.buildParamMap(name, type, active, parametersMapToList(params));

    var spec = filterMap
        .entrySet()
        .stream()
        .map(x -> x.getKey().makeSpec(x.getValue()))
        .reduce((aggregated, item) -> aggregated.and(item))
        .orElse(null);
    final Sort sort = Sort.by(order.getDirection(), sortBy.getColumnName());
    final PageRequest pageRequest = PageRequest.of(page, pageSize, sort);
    if (onlyMine != null && onlyMine) {
      spec = ResourcePoolFilterParams.OWNER_ID.makeSpec(authUser.getId()).and(spec);
    }
    final Page<ResourcePool> resourcePoolPage = repository.findAll(spec, pageRequest);
    final List<ResourcePoolGetDto> getDto = mapper.toGetDto(resourcePoolPage.getContent());
    final var pool = new ResourcePool();
    getDto.forEach(resourcePool -> {
      pool.setId(resourcePool.getId());
      resourcePool.setRequestsAmount((int) requestRepository
          .findByPool(pool)
          .stream()
          .filter(r -> r.getStatus() == RequestStatus.IN_PROGRESS)
          .count()
      );
    });
    return new PageModel<>(getDto, resourcePoolPage.getTotalElements(), page);
  }

  /**
   * {@inheritDoc}
   */
  @Override
  public List<NamedTypedDto> getTypedSuggestions(Integer typeId) {
    final var entities = repository.getSuggestions(typeId, false, 0, false, 0);
    return entities
        .stream()
        .map(entity -> namedEntityMapper.toNamedTypedDto(entity, typeId))
        .collect(Collectors.toList());
  }

  private List<GeneralParameterValue> parametersMapToList(Map<String, Object> params) {
    return params.entrySet().stream().map(item -> {
      final var param = parameterRepository.findById(Integer.parseInt(item.getKey())).orElse(null);
      return genParamValueMapper.toGeneralParameterValue(param, item.getValue());
    }).collect(Collectors.toList());
  }

  /**
   * {@inheritDoc}
   */
  @Override
  @Transactional
  public ResourcePoolGetDto create(@Valid ResourcePoolCreateDto resourcePool) {
    final var poolFromDto = mapper.fromCreateDto(resourcePool);
    updateOwnersRole(Set.of(), poolFromDto.getOwners());
    poolFromDto.setCurrentCapacity(poolFromDto.getTotalCapacity());
    final var pool = repository.saveAndRefresh(poolFromDto);
    return mapper.toGetDto(pool);
  }

  /**
   * {@inheritDoc}
   */
  @Override
  @Transactional
  public ResourcePoolGetDto update(@Valid ResourcePoolUpdateDto resourcePool) {
    final var poolFromDto = mapper.fromUpdateDto(resourcePool);
    final var poolById = repository.findById(resourcePool.getId()).get();
    if (poolById.getTotalCapacity() != poolFromDto.getTotalCapacity()) {
      poolFromDto.setCurrentCapacity(
          resourcePool.getTotalCapacity() - (poolById.getTotalCapacity() - poolById.getCurrentCapacity())
      );
    }
    final var oldOwners = Set.copyOf(poolById.getOwners());
    final var updatedPool = repository.saveAndRefresh(poolFromDto);
    updateOwnersRole(oldOwners, poolFromDto.getOwners());
    return mapper.toGetDto(updatedPool);
  }

  /**
   * {@inheritDoc}
   */
  @Override
  public void delete(Integer id) {
    final var poolById = repository.findById(id).orElse(null);
    if (poolById == null) {
      return;
    }
    repository.deleteById(id);
    updateOwnersRole(poolById.getOwners(), Set.of());
  }

  /**
   * This method implements the following rule: user has POOL_OWNER role only if he has a resource pool,
   * and if user has a resource pool he has the POOL_OWNER role
   * or a role with a higher priority than POOL_OWNER priority.
   * Must be called after pool update.
   *
   * @param oldOwners a set of pool owners received from a previous pool state.
   * @param newOwners a set of pool owners received from a current pool state.
   */
  private void updateOwnersRole(Set<Employee> oldOwners, Set<Employee> newOwners) {
    final var oldOwnerIds = oldOwners
        .stream()
        .map(Employee::getId)
        .collect(Collectors.toList());
    final var newOwnerIds = newOwners
        .stream()
        .map(Employee::getId)
        .collect(Collectors.toList());
    final var diff = new ArrayList<>(oldOwnerIds);
    diff.retainAll(newOwnerIds);
    oldOwnerIds.removeAll(diff);
    oldOwnerIds.forEach(employeeService::giveUserRole);
    newOwnerIds.removeAll(diff);
    newOwnerIds.forEach(employeeService::givePoolOwnerRole);
  }


}
