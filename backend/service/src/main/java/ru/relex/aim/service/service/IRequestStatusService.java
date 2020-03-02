package ru.relex.aim.service.service;

import ru.relex.aim.commons.EntityType;
import ru.relex.aim.service.model.RequestAcceptDto;
import ru.relex.aim.service.model.base.NamedDto;
import ru.relex.aim.service.model.create.CommentCreateDto;
import ru.relex.aim.service.model.get.CommentGetDto;
import ru.relex.aim.service.validation.annotation.EntityExists;

import java.util.List;

/**
 * Manages {@link ru.relex.aim.repository.entity.RequestStatus}.
 *
 * @author Sorokin Georgy
 */
public interface IRequestStatusService {
  /**
   * Try to accept request using current user's pools, then
   * saves allocation parameter values and a comment if it exists.
   *
   * @param dto contains identifier of request entity to accept. May never be null.
   * @return true, if pool capacity is enough to accept this request, else false.
   */
  boolean accept(RequestAcceptDto dto);

  /**
   * Sets the request status as canceled and save a comment.
   *
   * @param createDto contains comment content and id of request to reject.
   */
  CommentGetDto rejectAndComment(CommentCreateDto createDto);

  /**
   * Closes request by identifier and returns resources to pools.
   *
   * @param requestId request identifier
   */
  void close(@EntityExists(entityType = EntityType.REQUEST) Integer requestId);

  /**
   *  Sets request status as paused if the previous status was 'in progress'.
   */
  void pause(@EntityExists(entityType = EntityType.REQUEST) Integer requestId);

  /**
   *  Sets request status as 'in progress' if the previous status was 'paused'.
   */
  void resume(@EntityExists(entityType = EntityType.REQUEST) Integer requestId);

  /**
   * Fetches list of pools used to accept the request.
   * If the current user is admin, the list contains all pools whose type equals request type,
   * else it contains only pools of current user.
   */
  List<NamedDto> getPoolSuggestions(Integer requestId);
}
