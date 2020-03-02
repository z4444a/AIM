package ru.relex.aim.commons;

/**
 * Type of mail template.
 *
 * @author Nastya Zinchenko
 */
public enum TemplateType {
  CHANGE_STATUS("email.template.change-status", "email.header.change-status"),
  CREATE_REQUEST("email.template.create-request", "email.header.request"),
  FOR_POOLS_OWNERS_ABOUT_REQUEST("email.template.for-pools-owners-about-request", "email.header.request"),
  APPROVE_REQUEST("email.template.approve-request", "email.header.approve-request"),
  REJECT_REQUEST("email.template.reject-request", "email.header.reject-request");

  private String name;
  private String header;

  TemplateType(String name, String header) {
    this.name = name;
    this.header = header;
  }

  public String getName() {
    return name;
  }

  public String getHeader() {
    return header;
  }
}
