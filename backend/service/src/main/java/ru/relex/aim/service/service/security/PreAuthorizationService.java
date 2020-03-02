package ru.relex.aim.service.service.security;

import org.springframework.stereotype.Service;
import ru.relex.aim.repository.repository.RequestRepository;
import ru.relex.aim.repository.repository.ResourcePoolRepository;
import ru.relex.aim.security.model.AuthUser;
import ru.relex.aim.service.validation.annotation.EntityExists;


/**
 * Contains methods used by @PreAuthorize.
 */
@Service
public class PreAuthorizationService {

  private final AuthUser authUser;
  private final RequestRepository requestRepository;
  private final ResourcePoolRepository poolRepository;

  /**
   * Constructor.
   */
  public PreAuthorizationService(AuthUser authUser,
                                 RequestRepository requestRepository,
                                 ResourcePoolRepository poolRepository) {
    this.authUser = authUser;
    this.requestRepository = requestRepository;
    this.poolRepository = poolRepository;
  }

  /**
   * Returns true if the current user has enough rights to manage the request.
   */
  public boolean hasAccessToRequest(Integer requestId) {
    final var request = requestRepository.findById(requestId).orElse(null);
    if (request == null) {
      return false;
    }
    switch (authUser.getRole()) {
      case ADMIN:
        return true;
      case POOL_CREATOR:
        return true;
      case USER:
        return request.getAuthor().getId().equals(authUser.getId());
      case POOL_OWNER: {
        final var userPools = poolRepository.getResourcePoolByOwnerId(authUser.getId());
        return userPools
            .stream()
            .map(pool -> pool.getResourceType().getId())
            .anyMatch(t -> t.equals(request.getType().getId()));
      }
      default:
        return false;
    }
  }

  /**
   * Returns true if the current user has enough rights to manage the resource pool.
   */
  public boolean hasAccessToPool(Integer poolId) {
    final var pool = poolRepository.findById(poolId).orElse(null);
    if (pool == null) {
      return false;
    }
    switch (authUser.getRole()) {
      case ADMIN:
        return true;
      case POOL_CREATOR:
        return true;
      case USER:
        return false;
      case POOL_OWNER:
        return pool.getOwners()
            .stream()
            .anyMatch(owner -> owner.getId().equals(authUser.getId()));
      default:
        return false;
    }
  }
}
