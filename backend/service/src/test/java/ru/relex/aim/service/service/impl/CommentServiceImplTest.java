package ru.relex.aim.service.service.impl;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import ru.relex.aim.repository.entity.Comment;
import ru.relex.aim.repository.repository.CommentRepository;
import ru.relex.aim.security.model.AuthUser;
import ru.relex.aim.service.MapperTestConfiguration;
import ru.relex.aim.service.mapper.ICommentMapper;
import ru.relex.aim.service.model.create.CommentCreateDto;
import ru.relex.aim.service.service.ICommentService;


@TestInstance(TestInstance.Lifecycle.PER_CLASS)
@ExtendWith(SpringExtension.class)
@ContextConfiguration(classes = MapperTestConfiguration.class)
class CommentServiceImplTest {

  private final ICommentMapper commentMapper;
  private ICommentService commentService;

  @Autowired
  CommentServiceImplTest(ICommentMapper commentMapper) {
    this.commentMapper = commentMapper;
  }

  @BeforeAll
  void setUp() {
    final var createDto = new CommentCreateDto();
    createDto.setRequestId(0);
    createDto.setContent("fifi");
    createDto.setAuthorId(0);
    final var comment = commentMapper.fromCreateDto(createDto);
    final var commentWithId = commentMapper.fromCreateDto(createDto);
    commentWithId.setId(0);
    var commentRepository = Mockito.mock(CommentRepository.class);
    Mockito.when(commentRepository.saveAndRefresh(comment)).thenReturn(commentWithId);

    final var authUser = Mockito.mock(AuthUser.class);
    Mockito.when(authUser.getId()).thenReturn(0);
    commentService = new CommentServiceImpl(commentRepository, commentMapper, authUser);
  }

  @Test
  void create() {
    final var createDto = new CommentCreateDto();
    createDto.setRequestId(0);
    createDto.setContent("fifi");
    final var createDtoWithAuthor = new CommentCreateDto();
    createDtoWithAuthor.setRequestId(0);
    createDtoWithAuthor.setContent("fifi");
    createDtoWithAuthor.setAuthorId(0);
    final var comment = commentMapper.fromCreateDto(createDtoWithAuthor);
    comment.setId(0);
    final var getDto = commentMapper.toGetDto(comment);
    Assertions.assertEquals(getDto, commentService.create(createDto));
  }
}
