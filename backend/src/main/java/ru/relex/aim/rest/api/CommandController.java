package ru.relex.aim.rest.api;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import ru.relex.aim.service.model.CommandDto;
import ru.relex.aim.service.service.ICommandService;

import java.time.Instant;

/**
 * Controller class for managing commands.
 */
@RestController
@RequestMapping("/commands")
public class CommandController {

  private final ICommandService commandService;

  /**
   * Constructor.
   */
  public CommandController(ICommandService commandService) {
    this.commandService = commandService;
  }

  /**
   * Returns an object contains a list of commands and the current time.
   */
  @GetMapping
  public CommandDto getCommands(@RequestParam Integer poolId, @RequestParam Instant datetime) {
    return commandService.getCommands(poolId, datetime);
  }
}
