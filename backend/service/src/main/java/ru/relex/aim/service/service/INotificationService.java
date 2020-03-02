package ru.relex.aim.service.service;

import ru.relex.aim.commons.TemplateType;

import java.util.Map;

/**
 * Manages {@link ru.relex.aim.repository.entity.MailSettings}.
 *
 * @author Nastya Zinchenko
 */
public interface INotificationService {

  /**
   * Sends notification with specified parameters for user.
   */
  void notify(String user, TemplateType templateType, Map<String, Object> parameters);
}
