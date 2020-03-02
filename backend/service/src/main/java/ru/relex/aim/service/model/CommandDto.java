package ru.relex.aim.service.model;

import javax.validation.constraints.NotNull;
import java.time.Instant;
import java.util.List;
import java.util.Map;

/**
 * Contains pool parameters and commands for changing request statuses.
 */
public class CommandDto {
  private final Instant datetime;

  private List<Command> commands;

  private Map<String, String> poolParams;

  /**
   * Constructor. Sets {@code datetime} as the current time.
   */
  public CommandDto(List<Command> commands, Map<String, String> poolParams) {
    this.datetime = Instant.now();
    this.commands = commands;
    this.poolParams = poolParams;
  }

  public Instant getDatetime() {
    return datetime;
  }

  public List<Command> getCommands() {
    return commands;
  }

  public void setCommands(List<Command> commands) {
    this.commands = commands;
  }

  public Map<String, String> getPoolParams() {
    return poolParams;
  }

  public void setPoolParams(Map<String, String> poolParams) {
    this.poolParams = poolParams;
  }

  /**
   * Represents command for resource manager.
   * Contains request parameters and {@code action}  - the current status of request.
   */
  public static class Command {
    @NotNull
    private Integer uid;
    @NotNull
    private String action;
    private String author;
    private String owner;
    private Parameters params;

    /**
     * Constructor.
     */
    public Command(@NotNull Integer requestId,
                   @NotNull String action,
                   String author,
                   String owner) {
      uid = requestId;
      this.action = action;
      this.owner = owner;
      this.author = author;
    }

    public Integer getUid() {
      return uid;
    }

    public void setUid(Integer uid) {
      this.uid = uid;
    }

    public String getAction() {
      return action;
    }

    public void setAction(String action) {
      this.action = action;
    }

    public String getAuthor() {
      return author;
    }

    public void setAuthor(String author) {
      this.author = author;
    }

    public String getOwner() {
      return owner;
    }

    public void setOwner(String owner) {
      this.owner = owner;
    }

    public Parameters getParams() {
      return params;
    }

    public void setParams(Parameters params) {
      this.params = params;
    }

    /**
     * Contains request params and allocation params.
     */
    public static class Parameters {
      private Map<String, String> request;
      private Map<String, String> allocation;

      /**
       * Constructor.
       */
      public Parameters(Map<String, String> request, Map<String, String> allocation) {
        this.request = request;
        this.allocation = allocation;
      }

      public Map<String, String> getRequest() {
        return request;
      }

      public void setRequest(Map<String, String> request) {
        this.request = request;
      }

      public Map<String, String> getAllocation() {
        return allocation;
      }

      public void setAllocation(Map<String, String> allocation) {
        this.allocation = allocation;
      }
    }
  }
}
