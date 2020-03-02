package ru.relex.aim.security.intranet.model.params;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

/**
 * Keeps parameter used to receive user from the intranet.
 *
 * @author Sorokin Georgy
 */
@JsonIgnoreProperties(ignoreUnknown = true)
public class UserParams {
  private Integer id;

  public Integer getId() {
    return id;
  }

  public void setId(Integer id) {
    this.id = id;
  }
}
