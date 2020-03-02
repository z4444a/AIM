package ru.relex.aim.security.intranet.model;

/**
 * Intranet request pattern.
 * @author Sorokin Georgy
 */
public class Request<T> {

  private String jsonrpc;

  private Integer id;

  private String method;

  private T params;

  /**
   * Constructor. All parameters are required.
   */
  public Request(String jsonrpc, Integer id, String method, T params) {
    this.jsonrpc = jsonrpc;
    this.id = id;
    this.method = method;
    this.params = params;
  }

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

  public T getParams() {
    return params;
  }

  public void setParams(T params) {
    this.params = params;
  }
}
