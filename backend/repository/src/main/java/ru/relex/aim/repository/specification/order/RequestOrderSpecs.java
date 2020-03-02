package ru.relex.aim.repository.specification.order;

import javax.persistence.criteria.Expression;
import org.springframework.data.jpa.domain.Specification;
import ru.relex.aim.repository.entity.Request;
import ru.relex.aim.repository.entity.RequestStatus;

/**
 * Sets order for Request specifications.
 */
public class RequestOrderSpecs {

  private RequestOrderSpecs() {
  }

  /**
   * Sets default ordering for Requests.
   */
  public static Specification<Request> defaultOrder() {
    return (root, query, cb) -> {
      final Expression<Object> orderExpression = cb.selectCase()
          .when(cb.equal(root.get("status"), RequestStatus.NEW), 1)
          .otherwise(0);

      query.orderBy(cb.desc(orderExpression), cb.desc(root.get("creation")));
      return null;
    };
  }
}
