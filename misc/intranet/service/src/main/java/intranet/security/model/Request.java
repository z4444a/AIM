package intranet.security.model;

/**
 * Request pattern.
 *
 * @author Sorokin Georgy
 */
public class Request<T> extends DefaultRequest {

    private T params;

    public T getParams() {
        return params;
    }

    public void setParams(T params) {
        this.params = params;
    }
}
