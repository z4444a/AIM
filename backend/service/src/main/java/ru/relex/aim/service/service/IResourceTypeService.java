package ru.relex.aim.service.service;

import ru.relex.aim.service.filter.ResourceTypeFilterParams;
import ru.relex.aim.service.model.base.PageModel;
import ru.relex.aim.service.model.create.ResourceTypeCreateDto;
import ru.relex.aim.service.model.get.ResourceTypeGetDto;
import ru.relex.aim.service.model.get.ResourceTypeRowGetDto;
import ru.relex.aim.service.model.update.ResourceTypeUpdateDto;
import ru.relex.aim.service.sort.ResourceTypeSort;
import ru.relex.aim.service.sort.SortingOrder;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import java.util.List;
import java.util.Map;

/**
 * Manages {@link ru.relex.aim.repository.entity.ResourceType}.
 *
 * @author Alexey Alimov
 */
public interface IResourceTypeService {

  /**
   * Returns a page of {@link ru.relex.aim.repository.entity.ResourceType} instances
   * and applies the given filter and sorting order.
   *
   * @param filter   Filter object. May be null
   * @param sortBy   Column name by which to sort. May never be null
   * @param order    Sorting order. May never be null.
   * @param page     page number.
   * @param pageSize amount of elements to return in a page.
   * @return all instances with applied filter. Will never be null.
   * @author Alexey Alimov
   */
  PageModel<ResourceTypeRowGetDto> getAll(Map<ResourceTypeFilterParams, Object> filter,
                                          @NotNull ResourceTypeSort sortBy, @NotNull SortingOrder order,
                                          int page, int pageSize);

  /**
   * Returns a DTO of {@link ru.relex.aim.repository.entity.ResourceType}
   * by the given identifier.
   *
   * @param id identifier by which to find.
   * @return DTO if found. Null otherwise.
   */
  ResourceTypeGetDto get(int id);

  /**
   * Returns all names of active instances of {@link ru.relex.aim.repository.entity.ResourceType}.
   */
  List<ResourceTypeGetDto> getActiveList();

  /**
   * Creates an instance in database with information provided in DTO.
   *
   * @param resourceType DTO that holds information about entity to save May never be null.
   * @return saved entity.
   */
  ResourceTypeGetDto create(@Valid ResourceTypeCreateDto resourceType);

  /**
   * Updates instance of {@link ru.relex.aim.repository.entity.ResourceType}
   * with all of it's child entities.
   *
   * @param resourceType entity to update
   * @return updated instance
   */
  ResourceTypeGetDto update(@Valid ResourceTypeUpdateDto resourceType);

  /**
   * Returns whether a resource type with the given name exists.
   *
   * @return {@literal true} if an entity with the given name exists, {@literal false} otherwise.
   */
  boolean existsByName(String name);
}
