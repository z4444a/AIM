package ru.relex.aim.rest.api;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import ru.relex.aim.commons.modifier.ParameterModifier;
import ru.relex.aim.service.filter.ParameterFilterParam;
import ru.relex.aim.service.model.CheckResponse;
import ru.relex.aim.service.model.create.ParameterCreateDto;
import ru.relex.aim.service.model.get.ParameterGetDto;
import ru.relex.aim.service.service.IParameterService;

import java.util.List;

/**
 * Controller class for managing resource type parameters.
 *
 * @author Alexey Alimov
 */
@RestController
@RequestMapping("/parameters")
public class ParameterController {

  private final IParameterService service;

  /**
   * Constructor.
   */
  public ParameterController(IParameterService service) {
    this.service = service;
  }

  /**
   * Fetches a list of DTOs of resource parameter
   * by the given resource type identifier and applied filter.
   *
   * @param typeId resource type identifier by which to find.
   * @return List of DTOs if any found. Empty list otherwise.
   */
  @GetMapping
  public List<ParameterGetDto> getAll(@RequestParam Integer typeId,
                                      @RequestParam(required = false) ParameterModifier modifier,
                                      @RequestParam(required = false) Boolean isOwner) {
    final var filterMap = ParameterFilterParam.buildParamMap(typeId, modifier, isOwner);
    return service.getAll(filterMap);
  }

  /**
   * Adds new instance of {@link ParameterCreateDto}.
   *
   * @param parameterCreateDto new instance to create
   */
  @PostMapping(
      consumes = MediaType.APPLICATION_JSON_UTF8_VALUE
  )
  public ParameterGetDto addParameter(@RequestBody ParameterCreateDto parameterCreateDto) {
    return service.create(parameterCreateDto);
  }


  /**
   * Returns {@code true} if parameter with given id is set for any active pool or request.
   */
  @GetMapping(
      path = "{id}/is-used",
      produces = MediaType.APPLICATION_JSON_UTF8_VALUE
  )
  public CheckResponse findUsage(@PathVariable Integer id) {
    return new CheckResponse(service.isUsed(id));
  }

  /**
   * Returns true if identifier is used by a different parameter with the same modifier.
   */
  @GetMapping(
      path = "identifier",
      produces = MediaType.APPLICATION_JSON_UTF8_VALUE
  )
  public CheckResponse findIdentifier(@RequestParam String identifier,
                                      @RequestParam ParameterModifier modifier,
                                      @RequestParam(required = false) Integer id) {
    return new CheckResponse(service.isIdentifierUsed(identifier, modifier, id));
  }
}
