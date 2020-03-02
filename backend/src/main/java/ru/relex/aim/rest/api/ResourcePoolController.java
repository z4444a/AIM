package ru.relex.aim.rest.api;

import org.springframework.http.MediaType;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import ru.relex.aim.commons.SystemRole;
import ru.relex.aim.service.model.base.NamedDto;
import ru.relex.aim.service.model.base.PageModel;
import ru.relex.aim.service.model.create.ResourcePoolCreateDto;
import ru.relex.aim.service.model.get.DistributionTypesChartDto;
import ru.relex.aim.service.model.get.NamedTypedDto;
import ru.relex.aim.service.model.get.ResourcePoolFullGetDto;
import ru.relex.aim.service.model.get.ResourcePoolGetDto;
import ru.relex.aim.service.model.update.ResourcePoolUpdateDto;
import ru.relex.aim.service.service.IDistributionTypesChartService;
import ru.relex.aim.service.service.IRequestStatusService;
import ru.relex.aim.service.service.IResourcePoolService;
import ru.relex.aim.service.sort.ResourcePoolSort;
import ru.relex.aim.service.sort.SortingOrder;

import java.util.List;
import java.util.Map;

/**
 * Controller class for managing resource pools.
 *
 * @author Nastya Zincehnko
 */
@RestController
@RequestMapping("/pools")
public class ResourcePoolController {

  private final IResourcePoolService service;
  private final IDistributionTypesChartService chartService;
  private final IRequestStatusService acceptanceService;

  /**
   * Constructor.
   */
  public ResourcePoolController(IResourcePoolService service, IDistributionTypesChartService chartService,
                                IRequestStatusService acceptanceService) {
    this.service = service;
    this.chartService = chartService;
    this.acceptanceService = acceptanceService;
  }

  /**
   * Fetches instance of {@link ResourcePoolFullGetDto} by id.
   *
   * @param id for search by id
   */
  @PreAuthorize("@preAuthorizationService.hasAccessToPool(#id)")
  @GetMapping(value = "/{id}",
      produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
  public ResourcePoolFullGetDto getResourcePool(@PathVariable("id") int id) {
    return service.get(id);
  }

  /**
   * Fetches all instances of {@link ResourcePoolGetDto}.
   */
  @Secured({SystemRole.ADMIN, SystemRole.POOL_CREATOR, SystemRole.POOL_OWNER})
  @GetMapping(produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
  public PageModel<ResourcePoolGetDto> getAllResourcePool(
      @RequestParam(required = false) String name,
      @RequestParam(required = false) Integer type,
      @RequestParam(required = false) Boolean active,
      @RequestParam(required = false) Boolean onlyMine,
      @RequestParam(required = false) Map<String, Object> params,
      @RequestParam(defaultValue = "id") ResourcePoolSort sortBy,
      @RequestParam(defaultValue = "asc") SortingOrder order,
      @RequestParam(defaultValue = "0") int page,
      @RequestParam int pageSize) {
    return service.getAll(name, type, active, removePredefinedParams(params), onlyMine, sortBy, order, page, pageSize);
  }

  private Map<String, Object> removePredefinedParams(Map<String, Object> params) {
    params.remove("type");
    params.remove("pageSize");
    params.remove("active");
    params.remove("name");
    params.remove("order");
    params.remove("page");
    params.remove("sortBy");
    params.remove("onlyMine");
    return params;
  }

  /**
   * Adds new instance of {@link ResourcePoolGetDto}.
   *
   * @param recoursePool new instance to create
   */
  @Secured({SystemRole.ADMIN, SystemRole.POOL_CREATOR})
  @PostMapping(consumes = MediaType.APPLICATION_JSON_UTF8_VALUE)
  public ResourcePoolGetDto addResourcePool(@RequestBody ResourcePoolCreateDto recoursePool) {
    return service.create(recoursePool);
  }

  /**
   * Updates instance of {@link ResourcePoolGetDto}.
   *
   * @param updateDto new instance to update
   */
  @Secured({SystemRole.ADMIN, SystemRole.POOL_CREATOR})
  @PutMapping(path = "/{id}", consumes = MediaType.APPLICATION_JSON_UTF8_VALUE)
  public ResourcePoolGetDto update(@PathVariable("id") int id, @RequestBody ResourcePoolUpdateDto updateDto) {
    return service.update(updateDto);
  }

  /**
   * Deletes instance of {@link ResourcePoolGetDto} by id.
   *
   * @param id for deleting by id
   */
  @Secured({SystemRole.ADMIN, SystemRole.POOL_CREATOR})
  @DeleteMapping("/{id}")
  public void deleteById(@PathVariable("id") int id) {
    service.delete(id);
  }

  /**
   * Fetches a list of DTOs of distribution types chart
   * by the given owners and resourceTypes.
   *
   * @param owners        owners id by which to find.
   * @param resourceTypes resourceTypes id by which to find.
   */
  @GetMapping(value = "/chart", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
  public List<DistributionTypesChartDto> getAllDistributionTypesChart(
      @RequestParam int[] owners, int[] resourceTypes) {
    return chartService.getChart(owners, resourceTypes);
  }

  /**
   * Fetches resource pool suggestions to set allocation pool.
   *
   * @param requestId request identifier used to search needed pools
   * @return list of {@link NamedDto} presents available resource pools
   */
  @GetMapping("/allocation-suggestions")
  public List<NamedDto> getSuggestionsToAcceptRequest(@RequestParam Integer requestId) {
    return acceptanceService.getPoolSuggestions(requestId);
  }

  /**
   * Fetches resource pool suggestions.
   *
   * @return list of {@link NamedTypedDto} presents available resource pools with types.
   */
  @GetMapping("/typed-suggestions")
  public List<NamedTypedDto> getTypedSuggestions(@RequestParam Integer typeId) {
    return service.getTypedSuggestions(typeId);
  }

}
