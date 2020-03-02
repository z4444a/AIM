package ru.relex.aim.repository.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import ru.relex.aim.repository.entity.MailSettings;
import ru.relex.aim.repository.repository.base.BaseRepository;

import java.util.List;

/**
 * Manages {@link MailSettings}.
 *
 * @author Nastya Zinchenko
 */
public interface MailSettingsRepository extends BaseRepository<MailSettings, String> {

  /**
   * Returns settings by group.
   */
  @Query("SELECT s FROM MailSettings s WHERE s.key LIKE CONCAT(:group,'.%') ")
  List<MailSettings> getSettingsByGroup(@Param("group") String group);
}
