import React, { ReactNode } from 'react';
import NamedModel from '../../../../model/base/named-model';
import { Style } from './styles';
import Timelapse from '@material-ui/icons/Timelapse';
import Brightness1 from '@material-ui/icons/Brightness1';
import Cancel from '@material-ui/icons/Cancel';
import { RequestStatus as ReqStatus } from '../../../../model/get/request-status';
import { WithTranslation } from 'react-i18next';

export interface Props {
  status: NamedModel;
}

export type InternalProps = Props & Style & WithTranslation;

export class RequestStatus extends React.PureComponent<InternalProps> {
  public render(): ReactNode {
    const { status } = this.props;
    switch (status.id) {
      case ReqStatus.NEW:
        return this.renderNewReq();
      case ReqStatus.IN_PROGRESS:
        return this.renderInProgressReq();
      case ReqStatus.PROCESSED:
        return this.renderProcessedReq();
      case ReqStatus.CANCELED:
        return this.renderCanceledReq();
      case ReqStatus.PAUSED:
        return this.renderPausedReq();
      default:
        return null;
    }
  }

  private renderContainer(renderInner: () => ReactNode) {
    const { classes } = this.props;
    return <div className={classes.container}>{renderInner()}</div>;
  }

  private renderNewReq(): ReactNode {
    const { classes, t } = this.props;
    return this.renderContainer(() => (
      <React.Fragment>
        <Brightness1 className={classes.newReq} />
        {t('requestPage.status.new')}
      </React.Fragment>
    ));
  }

  private renderInProgressReq(): ReactNode {
    const { classes, t } = this.props;
    return this.renderContainer(() => (
      <React.Fragment>
        <Timelapse className={classes.inProgressReq} />
        {t('requestPage.status.inWork')}
      </React.Fragment>
    ));
  }

  private renderProcessedReq(): ReactNode {
    const { classes, t } = this.props;
    return this.renderContainer(() => (
      <React.Fragment>
        <Brightness1 className={classes.processedReq} />
        {t('requestPage.status.executed')}
      </React.Fragment>
    ));
  }

  private renderCanceledReq(): ReactNode {
    const { classes, t } = this.props;
    return this.renderContainer(() => (
      <React.Fragment>
        <Cancel className={classes.canceledReq} />
        {t('requestPage.status.canceled')}
      </React.Fragment>
    ));
  }

  private renderPausedReq(): ReactNode {
    const { classes, t } = this.props;
    return this.renderContainer(() => (
      <React.Fragment>
        <Timelapse className={classes.pausedReq} />
        {t('requestPage.status.paused')}
      </React.Fragment>
    ));
  }
}
