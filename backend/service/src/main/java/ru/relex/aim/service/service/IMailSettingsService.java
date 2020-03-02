package ru.relex.aim.service.service;

import ru.relex.aim.service.model.base.MailSettingsDto;

import java.util.List;

/**
 * Manages {@link ru.relex.aim.repository.entity.MailSettings}.
 *
 * @author Nastya Zinchenko
 */
public interface IMailSettingsService {

  /**
   * Returns all instances of{@link ru.relex.aim.repository.entity.MailSettings}.
   *
   * @return all instances.
   */
  List<MailSettingsDto> getSettings();

  /**
   * Returns all instances of{@link ru.relex.aim.repository.entity.MailSettings} by group.
   *
   * @param group - group of settings
   * @return all instances of specific group.
   */
  List<MailSettingsDto> getSettingsFromGroup(String group);

  /**
   * Saves settings.
   */
  List<MailSettingsDto> saveOrUpdateSettings(List<MailSettingsDto> viewList);
}
