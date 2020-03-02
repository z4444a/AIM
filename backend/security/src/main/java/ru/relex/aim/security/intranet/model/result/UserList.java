package ru.relex.aim.security.intranet.model.result;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.util.List;

/**
 * Keeps intranet users. Used by {@link ru.relex.aim.security.intranet.UserService}.
 * @author Sorokin Georgy
 */
@JsonIgnoreProperties(ignoreUnknown = true)
public class UserList {

  private List<User> users;

  public List<User> getUsers() {
    return users;
  }

  public void setUsers(List<User> users) {
    this.users = users;
  }
}
