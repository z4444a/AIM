package ru.relex.aim.rest.api;

import org.springframework.http.MediaType;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import ru.relex.aim.commons.SystemRole;
import ru.relex.aim.service.filter.ResourceTypeFilterParams;
import ru.relex.aim.service.model.base.PageModel;
import ru.relex.aim.service.model.create.ResourceTypeCreateDto;
import ru.relex.aim.service.model.get.ResourceTypeGetDto;
import ru.relex.aim.service.model.get.ResourceTypeRowGetDto;
import ru.relex.aim.service.model.update.ResourceTypeUpdateDto;
import ru.relex.aim.service.service.IResourceTypeService;
import ru.relex.aim.service.sort.ResourceTypeSort;
import ru.relex.aim.service.sort.SortingOrder;

import java.util.List;

/**
 * Controller class for managing resource types.
 *
 * @author Alexey Alimov
 */
@RestController
@RequestMapping("/resource-types")
public class ResourceTypeController {

  private final IResourceTypeService typeService;

  /**
   * Creates new instance of {@link ResourceTypeController}.
   *
   * @param typeService service to manage resource types.
   */
  public ResourceTypeController(IResourceTypeService typeService) {
    this.typeService = typeService;
  }

  /**
   * Fetches a page of {@link ResourceTypeGetDto} instances with applied filters and sorting.
   *
   * @param name     filter by name.
   * @param active   filter by active state.
   * @param sortBy   column by which to sort by. Defaults to id.
   * @param order    sorting order. Defaults to ascending.
   * @param page     page number. Defaults to 0.
   * @param pageSize size of a page. Defaults to 10.
   */
  @Secured({SystemRole.ADMIN})
  @GetMapping(
      produces = MediaType.APPLICATION_JSON_UTF8_VALUE
  )
  public PageModel<ResourceTypeRowGetDto> getAll(
      @RequestParam(required = false) String name, @RequestParam(required = false) Boolean active,
      @RequestParam(defaultValue = "id") ResourceTypeSort sortBy,
      @RequestParam(defaultValue = "asc") SortingOrder order,
      @RequestParam(defaultValue = "0") Integer page,
      @RequestParam Integer pageSize) {
    final var filterMap = ResourceTypeFilterParams.buildParamMap(name, active);
    return typeService.getAll(filterMap, sortBy, order, page, pageSize);
  }

  /**
   * Fetches a DTO of resource type by the given identifier.
   *
   * @param id identifier by which to find.
   * @return DTO if found. Null otherwise.
   */
  @GetMapping(
      path = "/{id}",
      produces = MediaType.APPLICATION_JSON_UTF8_VALUE
  )
  public ResourceTypeGetDto get(@PathVariable Integer id) {
    return typeService.get(id);
  }

  /**
   * Fetches names of all active instances of ResourceType.
   */
  @GetMapping(
      path = "/active",
      produces = MediaType.APPLICATION_JSON_UTF8_VALUE
  )
  public List<ResourceTypeGetDto> getAllActive() {
    return typeService.getActiveList();
  }

  /**
   * Adds new instance of {@link ResourceTypeCreateDto}.
   *
   * @param resourceType new instance to create
   */
  @Secured({SystemRole.ADMIN})
  @PostMapping(
      consumes = MediaType.APPLICATION_JSON_UTF8_VALUE
  )
  public ResourceTypeGetDto addResourceType(@RequestBody ResourceTypeCreateDto resourceType) {
    return typeService.create(resourceType);
  }

  /**
   * Updates an instance of {@link ResourceTypeCreateDto}
   * with all of it's child entities.
   *
   * @param resourceType instance to update.
   */
  @Secured({SystemRole.ADMIN})
  @PutMapping(
      path = "/{id}",
      produces = MediaType.APPLICATION_JSON_UTF8_VALUE
  )
  public ResourceTypeGetDto update(@PathVariable Integer id, @RequestBody ResourceTypeUpdateDto resourceType) {
    resourceType.setId(id);
    return typeService.update(resourceType);
  }

  /**
   * Returns whether a resource type with the given name exists.
   *
   * @param name to check.
   */
  @Secured({SystemRole.ADMIN})
  @GetMapping(
      path = "exists/{name}",
      produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
  public boolean existsByName(@PathVariable String name) {
    return typeService.existsByName(name);
  }
}
