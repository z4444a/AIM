package ru.relex.aim.security.intranet.model;

/**
 * Intranet response pattern.
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
