package ru.relex.aim.service.service.impl;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.relex.aim.commons.EntityType;
import ru.relex.aim.commons.modifier.ParameterModifier;
import ru.relex.aim.repository.entity.IParameterValue;
import ru.relex.aim.repository.entity.Request;
import ru.relex.aim.repository.entity.RequestStatus;
import ru.relex.aim.repository.repository.RequestRepository;
import ru.relex.aim.repository.repository.RequestStatusChangeRepository;
import ru.relex.aim.repository.repository.ResourcePoolRepository;
import ru.relex.aim.service.model.CommandDto;
import ru.relex.aim.service.service.ICommandService;
import ru.relex.aim.service.validation.annotation.BeforeNow;
import ru.relex.aim.service.validation.annotation.EntityExists;

import java.time.Instant;
import java.util.Objects;
import java.util.Set;
import java.util.function.Function;
import java.util.stream.Collectors;

/**
 * Constructs and returns response to command request.
 */
@Service
public class CommandServiceImpl implements ICommandService {
  private static final Set<RequestStatus> OPERATED = Set.of(
      RequestStatus.PAUSED,
      RequestStatus.IN_PROGRESS,
      RequestStatus.EXECUTED
  );
  private final Function<IParameterValue, String> key = parameterValue ->
      parameterValue.getParameter().getIdentifier();

  private final ResourcePoolRepository poolRepository;
  private final RequestRepository requestRepository;
  private final RequestStatusChangeRepository changeRepository;

  /**
   * Constructor.
   */
  public CommandServiceImpl(ResourcePoolRepository poolRepository,
                            RequestRepository requestRepository,
                            RequestStatusChangeRepository changeRepository) {
    this.poolRepository = poolRepository;
    this.requestRepository = requestRepository;
    this.changeRepository = changeRepository;
  }

  /**
   * {@inheritDoc}
   */
  @Override
  @Transactional
  public CommandDto getCommands(@EntityExists(entityType = EntityType.RESOURCE_POOL) Integer poolId,
                                @BeforeNow Instant lastUpdate) {

    final var pool = poolRepository.findById(poolId).orElseThrow();
    final var requests = requestRepository.findByPool(pool);
    final var poolParams = pool.getParametersValues()
        .stream()
        .filter(paramValue -> paramValue.getParameter().getIdentifier() != null)
        .collect(Collectors.toMap(key, IParameterValue::asStringValue));

    final var commands = requests
        .stream()
        .filter(request -> OPERATED.contains(request.getStatus()))
        .map(request -> toCommand(request, lastUpdate))
        .filter(Objects::nonNull)
        .collect(Collectors.toList());
    return new CommandDto(commands, poolParams);
  }

  private CommandDto.Command toCommand(Request request, Instant lastUpdate) {
    final var record = changeRepository.findFirstByRequestIdOrderByIdDesc(request.getId());
    if (record.getDatetime().isBefore(lastUpdate)) {
      return null;
    }
    final var requestParams = request.getRequestParameterValues()
        .stream()
        .filter(paramValue ->
            ParameterModifier.REQUEST_PARAMETER == paramValue.getParameter().getModifier()
                && paramValue.getParameter().getIdentifier() != null)
        .collect(Collectors.toMap(key, IParameterValue::asStringValue));

    final var allocationParams = request.getRequestParameterValues()
        .stream()
        .filter(paramValue ->
            ParameterModifier.ALLOCATION_PARAMETER == paramValue.getParameter().getModifier()
                && paramValue.getParameter().getIdentifier() != null)
        .collect(Collectors.toMap(key, IParameterValue::asStringValue));

    final var command = new CommandDto.Command(
        request.getId(),
        record.getStatus().getName(),
        record.getAuthor().getUsername(),
        request.getOwner().getUsername()
    );
    command.setParams(new CommandDto.Command.Parameters(requestParams, allocationParams));
    return command;
  }
}
