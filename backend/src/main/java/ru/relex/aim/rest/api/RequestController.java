package ru.relex.aim.rest.api;

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
import ru.relex.aim.service.model.AcceptanceStatusDto;
import ru.relex.aim.service.model.RequestAcceptDto;
import ru.relex.aim.service.model.base.PageModel;
import ru.relex.aim.service.model.create.CommentCreateDto;
import ru.relex.aim.service.model.create.RequestCreateDto;
import ru.relex.aim.service.model.get.CommentGetDto;
import ru.relex.aim.service.model.get.RequestGetDto;
import ru.relex.aim.service.model.get.RequestGetDtoWithComments;
import ru.relex.aim.service.model.get.RequestParameterValueGetDto;
import ru.relex.aim.service.model.get.RequestStatusChangeGetDto;
import ru.relex.aim.service.model.update.RequestUpdateDto;
import ru.relex.aim.service.service.IParameterValueService;
import ru.relex.aim.service.service.IRequestService;
import ru.relex.aim.service.service.IRequestStatusChangeService;
import ru.relex.aim.service.service.IRequestStatusService;
import ru.relex.aim.service.sort.RequestSort;
import ru.relex.aim.service.sort.SortingOrder;

import java.util.List;
import java.util.Map;

/**
 * Controller class for managing requests.
 *
 * @author Alexey Alimov
 */
@RestController
@RequestMapping("/requests")
public class RequestController {

  private final IRequestService service;
  private final IRequestStatusService statusService;
  private final IParameterValueService valueService;
  private final IRequestStatusChangeService changeService;

  /**
   * Constructor.
   */
  public RequestController(IRequestService service,
                           IRequestStatusService statusService,
                           IParameterValueService valueService,
                           IRequestStatusChangeService changeService) {
    this.service = service;
    this.statusService = statusService;
    this.valueService = valueService;
    this.changeService = changeService;
  }

  /**
   * Fetches a page of {@link RequestGetDto} instances with applied sorting.
   *
   * @param sortBy   column by which to sort by. Defaults to id.
   * @param order    sorting order. Defaults to ascending.
   * @param page     page number. Defaults to 0.
   * @param pageSize size of a page. Defaults to 10.
   */
  @GetMapping
  public PageModel<RequestGetDto> getAll(
      @RequestParam(required = false) Integer typeName,
      @RequestParam(required = false) String description,
      @RequestParam(required = false) Integer statusId,
      @RequestParam(required = false) Map<String, Object> params,
      @RequestParam(required = false) RequestSort sortBy,
      @RequestParam(defaultValue = "asc") SortingOrder order,
      @RequestParam(defaultValue = "0") Integer page,
      @RequestParam Integer pageSize) {

    return service.getAll(typeName, description, statusId, removePredefinedParams(params),
        sortBy, order, page, pageSize);
  }

  private Map<String, Object> removePredefinedParams(Map<String, Object> params) {
    params.remove("typeName");
    params.remove("pageSize");
    params.remove("statusId");
    params.remove("description");
    params.remove("order");
    params.remove("page");
    return params;
  }

  /**
   * Fetches a DTO of resource type by the given identifier.
   *
   * @param id identifier by which to find.
   * @return DTO if found. Null otherwise.
   */
  @PreAuthorize("@preAuthorizationService.hasAccessToRequest(#id)")
  @GetMapping("/{id}")
  public RequestGetDtoWithComments get(@PathVariable Integer id) {
    return service.get(id);
  }

  /**
   * Creates an instance in database with information provided in DTO.
   *
   * @param createDto DTO that holds information about entity to save.
   * @return saved entity.
   */
  @PostMapping
  public RequestGetDto create(@RequestBody RequestCreateDto createDto) {
    final var id = service.create(createDto);
    return service.get(id);
  }

  /**
   * Updates already existing entity with information provided in DTO.
   *
   * @param id        identifier of entity to update
   * @param updateDto DTO that holds information about entity to update.
   * @return updated entity.
   */
  @PutMapping("/{id}")
  public RequestGetDto update(@PathVariable Integer id, @RequestBody RequestUpdateDto updateDto) {
    return service.update(id, updateDto);
  }

  /**
   * Approve request by id using current user's pools.
   *
   * @param id identifier of entity to approve.
   * @return true, if pool capacity is enough to accept this request, else false.
   */
  @PreAuthorize("@preAuthorizationService.hasAccessToPool(#dto.poolId)")
  @PutMapping(path = "/{id}/accept")
  public AcceptanceStatusDto accept(@PathVariable Integer id, @RequestBody RequestAcceptDto dto) {
    dto.setId(id);
    return new AcceptanceStatusDto(statusService.accept(dto));
  }

  /**
   * Set the request status as canceled.
   *
   * @param id identifier of request entity to reject. May never be null.
   */
  @PreAuthorize("@preAuthorizationService.hasAccessToRequest(#id)")
  @PutMapping(path = "/{id}/reject")
  public CommentGetDto reject(@PathVariable Integer id, @RequestBody CommentCreateDto createDto) {
    createDto.setRequestId(id);
    return statusService.rejectAndComment(createDto);
  }

  /**
   * Set the request status as executed if it was in progress or paused.
   *
   * @param id identifier of request entity to close. May never be null.
   */
  @Secured({SystemRole.ADMIN})
  @DeleteMapping(path = "/{id}/close")
  public void close(@PathVariable Integer id) {
    statusService.close(id);
  }

  /**
   * Set the request status as paused if it was in progress.
   *
   * @param id identifier of request entity to pause. May never be null.
   */
  @Secured({SystemRole.ADMIN})
  @DeleteMapping(path = "/{id}/pause")
  public void pause(@PathVariable Integer id) {
    statusService.pause(id);
  }

  /**
   * Set the request status as 'in progress' if it was paused.
   *
   * @param id identifier of request entity to renew. May never be null.
   */
  @Secured({SystemRole.ADMIN})
  @DeleteMapping(path = "/{id}/resume")
  public void resume(@PathVariable Integer id) {
    statusService.resume(id);
  }

  /**
   * Fetches the history of request statuses.
   *
   * @param id identifier of request
   */
  @Secured({SystemRole.ADMIN})
  @GetMapping(path = "/{id}/history")
  public List<RequestStatusChangeGetDto> getHistory(@PathVariable Integer id) {
    return changeService.getHistory(id);
  }

  /**
   * Fetches allocation parameter values by request identifier.
   *
   * @param id identifier of request
   */
  @GetMapping(path = "/{id}/values")
  public List<RequestParameterValueGetDto> getValues(@PathVariable Integer id) {
    return valueService.getValuesByRequestId(id);
  }
}
