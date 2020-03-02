package ru.relex.aim.security.intranet.model.result;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import ru.relex.aim.security.intranet.model.params.UserParams;

/**
 * Keeps the result of an intranet response.
 * @author Sorokin Georgy
 */
@JsonIgnoreProperties(ignoreUnknown = true)
public class LoginResult extends UserParams {

  private String hashKey;

  public String getHashKey() {
    return hashKey;
  }

  public void setHashKey(String hashKey) {
    this.hashKey = hashKey;
  }

}
