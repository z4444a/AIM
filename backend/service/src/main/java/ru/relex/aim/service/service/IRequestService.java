package ru.relex.aim.service.service;

import ru.relex.aim.commons.EntityType;
import ru.relex.aim.service.model.base.PageModel;
import ru.relex.aim.service.model.create.RequestCreateDto;
import ru.relex.aim.service.model.create.RequestParameterValueCreateDto;
import ru.relex.aim.service.model.get.RequestGetDto;
import ru.relex.aim.service.model.get.RequestGetDtoWithComments;
import ru.relex.aim.service.model.update.RequestUpdateDto;
import ru.relex.aim.service.sort.RequestSort;
import ru.relex.aim.service.sort.SortingOrder;
import ru.relex.aim.service.validation.annotation.EntityExists;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;

import java.util.Map;

import static ru.relex.aim.service.validation.code.ConstraintCode.ENTITY_EXISTS;
import static ru.relex.aim.service.validation.code.ParameterCode.REQUEST;

/**
 * Manages {@link ru.relex.aim.repository.entity.Request}.
 *
 * @author Alexey Alimov
 */
public interface IRequestService {

  /**
   * Returns a page of {@link ru.relex.aim.repository.entity.Request}
   * instances and applies the given sorting order.
   *
   * @param typeId   Id of the request type. May be null
   * @param statusId Id of the request status. May be null
   * @param sortBy   Column name by which to sort. Mau be null.
   * @param order    Sorting order. May never be null.
   * @param page     page number.
   * @param pageSize amount of elements to return in a page.
   * @return all instances with applied filter. Will never be null.
   * @author Alexey Alimov
   */
  PageModel<RequestGetDto> getAll(Integer typeId, String description, Integer statusId,
                                  Map<String, Object> params, RequestSort sortBy,
                                  @NotNull SortingOrder order, int page, int pageSize);

  /**
   * Returns a DTO of {@link ru.relex.aim.repository.entity.Request} by the given identifier.
   *
   * @param id identifier by which to find. May never be null.
   * @return DTO if found. Null otherwise.
   */
  RequestGetDtoWithComments get(int id);

  /**
   * Creates an instance in database with information provided in DTO.
   *
   * @param createDto DTO that holds information about entity to save May never be null.
   * @return saved entity identifier.
   */
  Integer create(@NotNull @Valid RequestCreateDto createDto);

  /**
   * Updates already existing entity with information provided in DTO.
   *
   * @param id        identifier of entity to update. May never be null.
   * @param updateDto DTO that holds information about entity to update. May never be null.
   * @return updated entity.
   */
  RequestGetDto update(@EntityExists(message = ENTITY_EXISTS + REQUEST, entityType = EntityType.REQUEST) int id,
                       @Valid RequestUpdateDto updateDto);
}
