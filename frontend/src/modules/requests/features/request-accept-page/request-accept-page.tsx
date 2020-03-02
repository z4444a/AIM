import React, { ReactNode } from 'react';
import { WithTranslation } from 'react-i18next';
import { Style } from './styles';
import PanelWrapper from '../../../../commons/components/panel-wrapper';

import { WithSnackbarProps } from 'notistack';
import RequestAcceptForm from '../../components/request-accept-form/index';
import { mapDispatchToProps, mapStateToProps } from './index';
import { Redirect, RouteComponentProps } from 'react-router';
import Spinner from '../../../../commons/components/spinner/spinner';
import { RequestPageStatus } from '../../../../redux/reducers/request-accept-page-reducer';
import { Path } from '../../../../commons/path';
import { resetComment } from '../../../../redux/actions/request-accept-page-action';
import { Role } from '../../../../commons/role';

export interface Props {
  id: string;
}
interface State {
  needRedirect: boolean;
}
export type InternalProps = RouteComponentProps<Props> &
  ReturnType<typeof mapDispatchToProps> &
  ReturnType<typeof mapStateToProps> &
  Style &
  WithSnackbarProps &
  WithTranslation;

export class RequestAcceptPage extends React.PureComponent<InternalProps, State> {
  public constructor(props: InternalProps) {
    super(props);
    this.state = {
      needRedirect: false,
    };
  }
  public componentDidMount(): void {
    const { fetchRequest, match, fetchValues } = this.props;
    const id = +match.params.id;
    fetchRequest(id);
    fetchValues(id);
  }
  public componentWillUnmount(): void {
    const { resetState, resetComment, resetRequest, resetValues } = this.props;
    resetState();
    resetComment();
    resetRequest();
    resetValues();
  }
  private showSuccessStatus = (status: RequestPageStatus) => {
    const { enqueueSnackbar, t } = this.props;
    enqueueSnackbar(t('requestAcceptPage.status.' + status), {
      variant: 'success',
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'right',
      },
    });
  };
  private showErrorStatus = (status: RequestPageStatus) => {
    const { enqueueSnackbar, t } = this.props;
    enqueueSnackbar(t('requestAcceptPage.status.' + status), {
      variant: 'error',
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'right',
      },
    });
  };
  public componentWillReceiveProps(nextProps: InternalProps): void {
    const newStatus = nextProps.status;
    const curStatus = this.props.status;

    if (newStatus === curStatus) {
      return;
    }
    switch (newStatus) {
      case RequestPageStatus.POOL_CAPACITY_IS_NOT_ENOUGH:
      case RequestPageStatus.ACCEPTANCE_ERROR:
      case RequestPageStatus.REJECTION_ERROR:
      case RequestPageStatus.PAUSING_ERROR:
      case RequestPageStatus.CLOSING_ERROR:
      case RequestPageStatus.RESUMING_ERROR:
        this.showErrorStatus(newStatus);
        break;
      case RequestPageStatus.SUCCESSFULLY_ACCEPTED:
      case RequestPageStatus.SUCCESSFULLY_REJECTED:
      case RequestPageStatus.SUCCESSFULLY_PAUSED:
      case RequestPageStatus.SUCCESSFULLY_CLOSED:
      case RequestPageStatus.SUCCESSFULLY_RESUMED:
        this.setState({
          needRedirect: true,
        });
        this.showSuccessStatus(newStatus);
        break;
    }
  }
  public render(): ReactNode {
    const {
      classes,
      request,
      showDialog,
      hideDialog,
      open,
      submitComment,
      approved,
      chooseRejection,
      chooseAcceptance,
      fetchParameters,
      allocationParameters,
      requestParameters,
      reject,
      accept,
      pause,
      close,
      resume,
      comment,
      updateComment,
      getPoolSuggestions,
      suggestions,
      fetchHistory,
      requestHistory,
      user,
    } = this.props;
    if (this.state.needRedirect === true) {
      return <Redirect to={{ pathname: Path.REQUESTS }} />;
    }
    if (request === null) {
      return (
        <div className={classes.spinnerContainer}>
          <Spinner />
        </div>
      );
    } else
      return (
        <PanelWrapper>
          <div className={classes.container}>
            <RequestAcceptForm
              request={request}
              reject={reject}
              accept={accept}
              open={open}
              pause={pause}
              close={close}
              resume={resume}
              showDialog={showDialog}
              hideDialog={hideDialog}
              submitComment={submitComment}
              approved={approved}
              chooseRejection={chooseRejection}
              chooseAcceptance={chooseAcceptance}
              fetchParameters={fetchParameters}
              allocationParameters={allocationParameters}
              requestParameters={requestParameters}
              comment={comment}
              updateComment={updateComment}
              resetComment={resetComment}
              getPoolSuggestions={getPoolSuggestions}
              suggestions={suggestions}
              fetchHistory={fetchHistory}
              history={requestHistory}
              role={user !== null ? user.role : Role.USER}
            />
          </div>
        </PanelWrapper>
      );
  }
}
