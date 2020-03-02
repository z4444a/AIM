package ru.relex.aim.service.mapper;

import org.mapstruct.Mapper;
import ru.relex.aim.repository.entity.Employee;
import ru.relex.aim.repository.entity.MailSettings;
import ru.relex.aim.service.model.base.MailSettingsDto;
import ru.relex.aim.service.model.get.EmployeeGetDto;

import java.util.List;

/**
 * Maps between {@link MailSettings} and it's DTOs.
 *
 * @author Nastya Zinchenko
 */
@Mapper
public interface IMailSettingsMapper {

  /**
   * Converts  {@link MailSettings}
   * to {@link MailSettingsDto}.
   *
   * @param model entity to convert
   */
  MailSettingsDto toDto(MailSettings model);

  /**
   * Converts a list of {@link MailSettings}
   * to a list {@link MailSettingsDto}.
   *
   * @param model entities to convert
   */
  List<MailSettingsDto> toDto(List<MailSettings> model);

  /**
   * Converts  {@link MailSettingsDto}
   * to {@link MailSettings}.
   *
   * @param model entity to convert
   */
  MailSettings fromDto(MailSettingsDto model);

  /**
   * Connverts a list of {@link MailSettingsDto}
   * to a list {@link MailSettings}.
   *
   * @param model entities to convert
   */
  List<MailSettings> fromDto(List<MailSettingsDto> model);
}
