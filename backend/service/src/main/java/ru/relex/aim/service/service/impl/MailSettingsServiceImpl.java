package ru.relex.aim.service.service.impl;

import org.springframework.stereotype.Service;
import ru.relex.aim.repository.entity.MailSettings;
import ru.relex.aim.repository.repository.MailSettingsRepository;
import ru.relex.aim.service.mapper.IMailSettingsMapper;
import ru.relex.aim.service.model.base.MailSettingsDto;
import ru.relex.aim.service.service.IMailSettingsService;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Manages {@link ru.relex.aim.repository.entity.MailSettings}.
 *
 * @author Nastya Zinchenko
 */
@Service
public class MailSettingsServiceImpl implements IMailSettingsService {

  private final IMailSettingsMapper mapper;
  private final MailSettingsRepository repository;

  /**
   * Constructor.
   */
  public MailSettingsServiceImpl(IMailSettingsMapper mailSettingsMapper, MailSettingsRepository repository) {
    this.mapper = mailSettingsMapper;
    this.repository = repository;
  }

  /**
   * {@inheritDoc}
   */
  @Override
  public List<MailSettingsDto> getSettings() {
    return mapper.toDto(repository.findAll());
  }

  /**
   * {@inheritDoc}
   */
  @Override
  public List<MailSettingsDto> getSettingsFromGroup(String group) {
    return mapper.toDto(repository.getSettingsByGroup(group));
  }

  /**
   * {@inheritDoc}
   */
  @Override
  public List<MailSettingsDto> saveOrUpdateSettings(List<MailSettingsDto> viewList) {
    return viewList.stream()
        .map(mapper::fromDto)
        .map(repository::saveAndRefresh)
        .map(mapper::toDto)
        .collect(Collectors.toList());
  }
}
