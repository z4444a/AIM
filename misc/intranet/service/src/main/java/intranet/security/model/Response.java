package intranet.security.model;

/**
 * Response pattern.
 *
 * @author Sorokin Georgy
 */
public class Response<T> {

    private T result;

    public T getResult() {
        return result;
    }

    public void setResult(T result) {
        this.result = result;
    }
}
