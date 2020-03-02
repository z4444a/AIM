package ru.relex.aim.rest.api;

import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.relex.aim.commons.SystemRole;
import ru.relex.aim.service.model.base.MailSettingsDto;
import ru.relex.aim.service.service.IMailSettingsService;

import java.util.List;

/**
 * Controller class for managing settings.
 *
 * @author Nastya Zincehnko
 */
@RestController
@RequestMapping("/settings")
public class SettingsController {

  private final IMailSettingsService service;

  /**
   * Constructor.
   */
  public SettingsController(IMailSettingsService settingsService) {
    service = settingsService;
  }

  /**
   * Fetches all instances of {@link MailSettingsDto}.
   */
  @Secured({SystemRole.ADMIN})
  @GetMapping
  public List<MailSettingsDto> get() {
    return service.getSettings();
  }

  /**
   * Fetches instance of {@link MailSettingsDto} by group.
   *
   * @param group for search by group
   */
  @Secured({SystemRole.ADMIN})
  @GetMapping("/get/{group}")
  public List<MailSettingsDto> getFromGroup(@PathVariable String group) {
    return service.getSettingsFromGroup(group);
  }

  /**
   * Saves settings.
   */
  @Secured({SystemRole.ADMIN})
  @PostMapping
  public List<MailSettingsDto> save(@RequestBody List<MailSettingsDto> listView) {
    return service.saveOrUpdateSettings(listView);
  }

}
