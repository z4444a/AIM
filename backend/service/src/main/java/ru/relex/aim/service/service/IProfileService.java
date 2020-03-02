package ru.relex.aim.service.service;

import ru.relex.aim.service.model.UserProfileDto;

/**
 * Responsible for retrieving various data related to current user.
 *
 * @author Nikita Skornyakov
 * @date 22.07.2019
 */
public interface IProfileService {

  /**
   * Retrieves current user profile.
   */
  UserProfileDto getProfile();

}
