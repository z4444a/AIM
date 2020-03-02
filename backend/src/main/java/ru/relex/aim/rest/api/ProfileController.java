package ru.relex.aim.rest.api;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.relex.aim.service.model.UserProfileDto;
import ru.relex.aim.service.service.IProfileService;

/**
 * Contains entry points for operations that can be used to get and manpulate user profile data.
 *
 * @author Nikita Skornyakov
 * @date 22.07.2019
 */
@RestController
@RequestMapping(path = "/profile")
public class ProfileController {

  private final IProfileService profileService;

  /**
   * Default constructor.
   */
  public ProfileController(IProfileService profileService) {
    this.profileService = profileService;
  }

  /**
   * Retrieves current user profile.
   */
  @GetMapping(produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
  public UserProfileDto getProfile() {
    return profileService.getProfile();
  }
}
