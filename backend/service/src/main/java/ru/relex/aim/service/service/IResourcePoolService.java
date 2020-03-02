package ru.relex.aim.service.service;


import ru.relex.aim.service.model.base.NamedDto;
import ru.relex.aim.service.model.base.PageModel;
import ru.relex.aim.service.model.create.ResourcePoolCreateDto;
import ru.relex.aim.service.model.get.NamedTypedDto;
import ru.relex.aim.service.model.get.ResourcePoolFullGetDto;
import ru.relex.aim.service.model.get.ResourcePoolGetDto;
import ru.relex.aim.service.model.update.ResourcePoolUpdateDto;
import ru.relex.aim.service.sort.ResourcePoolSort;
import ru.relex.aim.service.sort.SortingOrder;

import javax.validation.Valid;
import java.util.List;
import java.util.Map;

/**
 * Manages {@link ru.relex.aim.repository.entity.ResourcePool}.
 *
 * @author Nastya Zinchenko
 */
public interface IResourcePoolService {
  //region CRUD

  /**
   * Retrieves instance of
   * {@link ru.relex.aim.repository.entity.ResourcePool} by id.
   *
   * @param id identifier of ResourcePool to find
   * @return instance if found. {@code null} otherwise
   */
  ResourcePoolFullGetDto get(Integer id);

  /**
   * Creates instance of {@link ru.relex.aim.repository.entity.ResourcePool}
   * if entity is valid {@link ResourcePoolCreateDto}.
   *
   * @param resourcePool entity for creating
   * @return new created instance
   */
  ResourcePoolGetDto create(@Valid ResourcePoolCreateDto resourcePool);

  /**
   * Updates instance of {@link ru.relex.aim.repository.entity.ResourcePool}
   * if entity is valid {@link ResourcePoolUpdateDto}.
   *
   * @param resourcePool entity for updating
   * @return updated instance
   */
  ResourcePoolGetDto update(@Valid ResourcePoolUpdateDto resourcePool);

  /**
   * Deletes instance of {@link ru.relex.aim.repository.entity.ResourcePool} by id.
   *
   * @param id param for deleting
   */
  void delete(Integer id);
  //endregion

  /**
   * Returns all instances of {@link ru.relex.aim.repository.entity.ResourcePool}.
   *
   * @return all instances.
   */
  PageModel<ResourcePoolGetDto> getAll(String name, Integer type, Boolean active, Map<String, Object> params,
                                       Boolean onlyMine, ResourcePoolSort sortBy, SortingOrder order, int page,
                                       int pageSize);

  /**
   * Fetches pool suggestions by the type identifier.
   *
   * @return list of {@link NamedTypedDto}.
   */
  List<NamedTypedDto> getTypedSuggestions(Integer typeId);
}
