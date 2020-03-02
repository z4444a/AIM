package ru.relex.aim.rest.api;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.relex.aim.service.model.create.CommentCreateDto;
import ru.relex.aim.service.model.get.CommentGetDto;
import ru.relex.aim.service.service.ICommentService;

/**
 * Controller class for managing comments.
 *
 * @author Sorokin Georgy
 */
@RestController
@RequestMapping("/comments")
public class CommentController {

  private final ICommentService service;

  /**
   * Constructor.
   */
  public CommentController(ICommentService service) {
    this.service = service;
  }

  /**
   * Creates an instance in database with information provided in DTO.
   *
   * @param createDto DTO that holds information about entity to save.
   * @return saved entity.
   */
  @PostMapping
  public CommentGetDto create(@RequestBody CommentCreateDto createDto) {
    return service.create(createDto);
  }
}
