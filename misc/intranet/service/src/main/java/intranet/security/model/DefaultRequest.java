package intranet.security.model;

/**
 * Allows to identify response method.
 *
 * @author Sorokin Georgy
 */
public class DefaultRequest {

    private String jsonrpc;

    private String method;

    private Integer id;

    public String getJsonrpc() {
        return jsonrpc;
    }

    public void setJsonrpc(String jsonrpc) {
        this.jsonrpc = jsonrpc;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getMethod() {
        return method;
    }

    public void setMethod(String method) {
        this.method = method;
    }
}
