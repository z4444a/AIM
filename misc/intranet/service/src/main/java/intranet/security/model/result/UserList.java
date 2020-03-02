package intranet.security.model.result;

import intranet.db.entity.User;

import java.util.List;

/**
 * Keeps users response payload.
 * @author Sorokin Georgy
 */
public class UserList {

    private List<User> users;

    public List<User> getUsers() {
        return users;
    }

    public void setUsers(List<User> users) {
        this.users = users;
    }
}
