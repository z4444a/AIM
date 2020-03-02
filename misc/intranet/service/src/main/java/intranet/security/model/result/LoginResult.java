package intranet.security.model.result;

import intranet.security.model.params.UserParams;

/**
 * Keeps login response payload.
 * @author Sorokin Georgy
 */
public class LoginResult extends UserParams {

    private String hashKey;

    public String getHashKey() {
        return hashKey;
    }

    public void setHashKey(String hashKey) {
        this.hashKey = hashKey;
    }

}
