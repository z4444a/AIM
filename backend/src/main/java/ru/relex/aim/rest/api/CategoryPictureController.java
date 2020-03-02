package ru.relex.aim.rest.api;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.relex.aim.service.model.create.CategoryPictureCreateDto;
import ru.relex.aim.service.model.get.CategoryPictureGetDto;
import ru.relex.aim.service.service.ICategoryPictureService;

/**
 * Controller class for managing category picture.
 *
 * @author Dmitriy Poshevelya
 */
@RestController
@RequestMapping("/pictures")
public class CategoryPictureController {
  private final ICategoryPictureService service;

  /**
   * Constructor.
   */
  public CategoryPictureController(ICategoryPictureService service) {
    this.service = service;
  }

  /**
   * Get picture.
   */
  @GetMapping(value = "/{id}",
      produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
  public CategoryPictureGetDto getCategoryPicture(@PathVariable("id") int id) {
    return service.get(id);
  }

  /**
   * Adds new instance of {@link CategoryPictureCreateDto}.
   *
   * @param categoryPictureIcon new instance to create
   */
  @PostMapping(
      consumes = MediaType.APPLICATION_OCTET_STREAM_VALUE)
  public CategoryPictureGetDto addCategoryPictureIcon(@RequestBody CategoryPictureCreateDto categoryPictureIcon) {
    return service.createIcon(categoryPictureIcon);
  }
}
