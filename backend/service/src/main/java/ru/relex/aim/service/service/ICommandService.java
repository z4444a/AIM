package ru.relex.aim.service.service;

import ru.relex.aim.commons.EntityType;
import ru.relex.aim.service.model.CommandDto;
import ru.relex.aim.service.validation.annotation.BeforeNow;
import ru.relex.aim.service.validation.annotation.EntityExists;

import java.time.Instant;

/**
 *  Constructs commands for requests.
 */
public interface ICommandService {
  /**
   *  Returns an object contains list of commands and the current time.
   */
  CommandDto getCommands(@EntityExists(entityType = EntityType.RESOURCE_POOL) Integer poolId,
                         @BeforeNow Instant lastUpdate);
}
