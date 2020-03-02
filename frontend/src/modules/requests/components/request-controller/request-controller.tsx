import React from 'react';
import FullParameterModel from '../../../../model/get/full-parameter-model';
import AcceptDialogValuesHandler from '../../features/accept-dialog-values-handler/index';
import RejectDialog from '../reject-dialog/index';
import { Button } from '@material-ui/core';
import { WithTranslation } from 'react-i18next';
import { Style } from './styles';
import { GenericFormValue } from '../../../../commons/components/generic-fields/models/field-config.model';
import RequestModel from '../../../../model/get/request-model';
import NamedModel from '../../../../model/base/named-model';
import Tooltip from '@material-ui/core/Tooltip';
import { RequestStatus } from '../../../../model/get/request-status';

export interface InternalProps {
  request: RequestModel;
  open: boolean;
  reject: (comment: string) => void;
  accept: (poolId: number, values?: GenericFormValue, comment?: string) => void;
  pause: () => void;
  close: () => void;
  resume: () => void;
  approved: boolean;

  showDialog: () => void;
  hideDialog: () => void;
  chooseAcceptance: () => void;
  chooseRejection: () => void;

  fetchParameters: () => void;
  parameters: FullParameterModel[];

  comment: string;
  updateComment: (content: string) => void;
  resetComment: () => void;

  getPoolSuggestions: (requestId: number) => void;
  suggestions: NamedModel[];
}

export type Props = InternalProps & WithTranslation & Style;

export class RequestController extends React.PureComponent<Props> {
  public componentDidMount(): void {
    const { getPoolSuggestions, request } = this.props;
    getPoolSuggestions(request.id);
  }

  public render(): React.ReactNode {
    const {
      approved,
      hideDialog,
      parameters,
      comment,
      updateComment,
      resetComment,
      fetchParameters,
      open,
      request,
      accept,
      reject,
      suggestions,
    } = this.props;
    const status: RequestStatus = request.status.id;
    return (
      <div>
        {approved ? (
          <AcceptDialogValuesHandler
            open={open}
            close={hideDialog}
            submit={accept}
            fetchParameters={fetchParameters}
            parameters={parameters}
            comment={comment}
            updateComment={updateComment}
            resetComment={resetComment}
            suggestions={suggestions}
          />
        ) : (
          <RejectDialog
            open={open}
            close={hideDialog}
            submit={reject}
            comment={comment}
            updateComment={updateComment}
            resetComment={resetComment}
          />
        )}
        {this.renderControl(status)}
      </div>
    );
  }
  private renderControl(status: RequestStatus) {
    switch (status) {
      case RequestStatus.NEW:
        return this.renderNewRequestButtons();
      case RequestStatus.IN_PROGRESS:
        return this.renderRequestInProgressButtons();
      case RequestStatus.PAUSED:
        return this.renderPausedRequestButtons();
      default:
        return <div />;
    }
  }
  private renderNewRequestButtons = () => {
    const { t, classes, suggestions } = this.props;
    const disabled = suggestions.length === 0;
    return (
      <div className={`${classes.flex} ${classes.spaceBeforeButtons}`}>
        <Tooltip title={disabled ? t('requestAcceptPage.tooltips.rejectButton') : ''}>
          <div>
            <Button variant="contained" onClick={this.openAcceptanceDialog} disabled={disabled}>
              {t('requestAcceptPage.buttons.accept')}
            </Button>
          </div>
        </Tooltip>
        <Button variant="contained" onClick={this.openRejectionDialog}>
          {t('requestAcceptPage.buttons.reject')}
        </Button>
      </div>
    );
  };

  private renderRequestInProgressButtons = () => {
    const { t, classes, pause, close } = this.props;
    return (
      <div className={`${classes.flex} ${classes.spaceBeforeButtons}`}>
        <Button variant="contained" onClick={() => pause()}>
          {t('requestAcceptPage.buttons.pause')}
        </Button>
        <Button variant="contained" onClick={() => close()}>
          {t('requestAcceptPage.buttons.close')}
        </Button>
      </div>
    );
  };

  private renderPausedRequestButtons = () => {
    const { t, classes, resume, close } = this.props;
    return (
      <div className={`${classes.flex} ${classes.spaceBeforeButtons}`}>
        <Button variant="contained" onClick={() => resume()}>
          {t('requestAcceptPage.buttons.resume')}
        </Button>
        <Button variant="contained" onClick={() => close()}>
          {t('requestAcceptPage.buttons.close')}
        </Button>
      </div>
    );
  };
  private openAcceptanceDialog = () => {
    const { showDialog, chooseAcceptance } = this.props;
    chooseAcceptance();
    showDialog();
  };
  private openRejectionDialog = () => {
    const { showDialog, chooseRejection } = this.props;
    chooseRejection();
    showDialog();
  };
}
