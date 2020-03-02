package ru.relex.aim.service.service.impl;

import org.springframework.stereotype.Service;
import ru.relex.aim.repository.entity.Comment;
import ru.relex.aim.repository.repository.CommentRepository;
import ru.relex.aim.security.model.AuthUser;
import ru.relex.aim.service.mapper.ICommentMapper;
import ru.relex.aim.service.model.create.CommentCreateDto;
import ru.relex.aim.service.model.get.CommentGetDto;
import ru.relex.aim.service.service.ICommentService;

import javax.validation.constraints.NotNull;

/**
 * Implementation of {@link ICommentService}.
 *
 * @author Sorokin Georgy
 */
@Service
public class CommentServiceImpl implements ICommentService {
  private final CommentRepository repository;
  private final ICommentMapper mapper;
  private final AuthUser authUser;

  /**
   * Constructor.
   */
  public CommentServiceImpl(CommentRepository repository, ICommentMapper mapper,
                            AuthUser authUser) {
    this.repository = repository;
    this.mapper = mapper;
    this.authUser = authUser;
  }

  @Override
  public CommentGetDto create(@NotNull CommentCreateDto createDto) {
    createDto.setAuthorId(authUser.getId());
    Comment comment = mapper.fromCreateDto(createDto);
    comment = repository.saveAndRefresh(comment);
    return mapper.toGetDto(comment);
  }
}
