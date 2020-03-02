import { WithTranslation } from 'react-i18next';
import React, { ReactNode } from 'react';
import { Paper } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { Style } from './styles';
import RequestModel from '../../../../model/get/request-model';
import Moment from 'react-moment';
import { DateFormat } from '../../../../commons/values/date-format';
import { CommentCreateModel } from '../../../../model/create/comment-create-model';
import RequestStatus from '../../components/request-status/index';
import { ParameterParameters } from '../../../../model/parameters/parameter-parameters';
import FullParameterModel from '../../../../model/get/full-parameter-model';
import { ParameterModifier } from '../../../../model/parameter-modifier';
import { RequestAcceptanceModel } from '../../../../model/update/request-acceptance-model';
import { ParameterValueCreateModel } from '../../../../model/create/parameter-value-create-model';
import { GenericFormValue } from '../../../../commons/components/generic-fields/models/field-config.model';
import ParameterValuesCard from '../../features/parameter-values-card/index';
import RequestController from '../request-controller/index';
import { RequestStatus as ReqStatus } from '../../../../model/get/request-status';
import Description from './description';
import NamedModel from '../../../../model/base/named-model';
import Comments from './comments';
import localStorageHelperService from '../../../../commons/services/local-storage-helper-service';
import HistoryDialog from '../history-dialog/index';
import { RequestStatusChangeGetModel } from '../../../../model/get/request-status-change-get-model';
import { Role } from '../../../../commons/role';
import { ParameterValueMapper } from '../../../../commons/services/parameter-value-mapper';

export interface Props {
  request: RequestModel;
  open: boolean;
  showDialog: () => void;
  hideDialog: () => void;
  submitComment: (comment: CommentCreateModel) => void;
  reject: (comment: CommentCreateModel) => void;
  accept: (dto: RequestAcceptanceModel) => void;
  pause: (id: number) => void;
  close: (id: number) => void;
  resume: (id: number) => void;
  approved: boolean;
  chooseAcceptance: () => void;
  chooseRejection: () => void;
  fetchParameters: (params: ParameterParameters) => void;
  allocationParameters: FullParameterModel[];
  requestParameters: FullParameterModel[];
  comment: string;
  updateComment: (content: string) => void;
  resetComment: () => void;
  getPoolSuggestions: (requestId: number) => void;
  suggestions: NamedModel[];
  fetchHistory: (id: number) => void;
  history: RequestStatusChangeGetModel[];
  role: Role;
}

export type InternalProps = Props & Style & WithTranslation;

export class RequestAcceptForm extends React.PureComponent<InternalProps> {
  public render(): ReactNode {
    const {
      classes,
      request,
      t,
      open,
      hideDialog,
      approved,
      allocationParameters,
      requestParameters,
      comment,
      updateComment,
      resetComment,
      showDialog,
      chooseRejection,
      chooseAcceptance,
      getPoolSuggestions,
      suggestions,
      pause,
      close,
      resume,
      fetchHistory,
      history,
      role,
    } = this.props;
    const currentUser = localStorageHelperService.getUserInfo();
    const isAdmin = currentUser ? currentUser.role === 'ADMIN' : false;

    const { renderField, renderPeriod } = this;
    const amount = {
      parameter: t('requestAcceptPage.fields.amount'),
      value: request.amount.toString(),
    };
    return (
      <div className={classes.innerContainer}>
        <div className={classes.gridContainer}>
          <Paper
            classes={{
              root: classes.container,
            }}
          >
            <div className={classes.flex}>
              <Typography variant="h5">
                {t('requestAcceptPage.headers.request', { id: request.id })}
              </Typography>
              <HistoryDialog
                fetchHistory={() => fetchHistory(request.id)}
                history={history}
                show={role === Role.ADMIN}
              />
            </div>
            <Typography variant="subtitle1" className={classes.flex}>
              <div className={classes.flex}>
                <div>
                  {renderField('type', request.type.name)}
                  {renderField('status', <RequestStatus status={request.status} />)}
                  {renderField('period', renderPeriod(request.usageStart, request.usageFinish))}
                  {request.owner === null ? <br /> : renderField('responsible', request.owner.name)}
                </div>
                <div>
                  {renderField('author', request.author.name)}
                  {renderField('project', request.project ? request.project.name : ' ')}
                  {request.pool === null || !isAdmin ? (
                    <br />
                  ) : (
                    renderField('pool', request.pool.name, `/resource-pools/${request.pool.id}`)
                  )}
                </div>
                <div>
                  {renderField(
                    'creation',
                    <Moment date={request.creation} format={DateFormat.ISO_DATE_TIME} />
                  )}
                </div>
              </div>
            </Typography>
            <RequestController
              request={request}
              reject={this.submitRejectionRequest}
              accept={this.submitAcceptanceRequest}
              pause={() => pause(request.id)}
              close={() => close(request.id)}
              resume={() => resume(request.id)}
              fetchParameters={this.fetchAllocationParameters}
              open={open}
              approved={approved}
              showDialog={showDialog}
              hideDialog={hideDialog}
              chooseAcceptance={chooseAcceptance}
              chooseRejection={chooseRejection}
              parameters={allocationParameters}
              comment={comment}
              updateComment={updateComment}
              resetComment={resetComment}
              getPoolSuggestions={getPoolSuggestions}
              suggestions={suggestions}
            />
          </Paper>
        </div>
        <Description content={request.description} />
        <ParameterValuesCard
          header={'requestParameters'}
          parameters={requestParameters}
          fetchParameters={this.fetchRequestParameters}
          amount={request.type.quantitative ? amount : undefined}
        />
        {request.status.id === ReqStatus.IN_PROGRESS && (
          <ParameterValuesCard
            header={'allocationParameters'}
            parameters={allocationParameters}
            fetchParameters={this.fetchAllocationParameters}
          />
        )}
        {request.comments && request.comments.length !== 0 && (
          <Comments comments={request.comments} />
        )}
      </div>
    );
  }

  private renderField = (name: string, value: ReactNode, hyperlink?: string): ReactNode => {
    const { classes, t } = this.props;
    return (
      <div className={classes.fieldLine}>
        <div className={classes.fieldName}>{t(`requestAcceptPage.fields.${name}`)}:</div>
        {hyperlink ? (
          <a style={{ color: 'black' }} href={hyperlink}>
            {value}
          </a>
        ) : (
          <div>{value}</div>
        )}
      </div>
    );
  };
  private renderPeriod = (from: Date, to: Date): ReactNode => {
    const { classes } = this.props;
    const format = DateFormat.ISO_DATE;
    return (
      <div className={classes.fieldLine}>
        <Moment date={from} format={format} />
        <div className={classes.sideSpace}> -</div>
        <Moment date={to} format={format} />
      </div>
    );
  };

  private fetchAllocationParameters = () => {
    const { fetchParameters, request } = this.props;
    const currentUser = localStorageHelperService.getUserInfo();
    fetchParameters({
      typeId: request.type.id,
      modifier: ParameterModifier.ALLOCATION_PARAMETER,
      isOwner:
        currentUser !== null && request.owner !== null && currentUser.id === request.owner.id
          ? true
          : undefined,
    });
  };
  private fetchRequestParameters = () => {
    const { fetchParameters, request } = this.props;
    fetchParameters({
      typeId: request.type.id,
      modifier: ParameterModifier.REQUEST_PARAMETER,
    });
  };
  private submitRejectionRequest = (comment: string) => {
    const { reject, hideDialog, request } = this.props;
    hideDialog();
    const commentModel: CommentCreateModel = {
      content: comment,
      requestId: request.id,
    };
    reject(commentModel);
  };

  private submitAcceptanceRequest = (
    poolId: number,
    values?: GenericFormValue,
    comment?: string
  ) => {
    const { accept, request, hideDialog, allocationParameters } = this.props;
    hideDialog();
    const genericValue = values ? values : {};
    const resourceTypeParams: ParameterValueCreateModel[] = ParameterValueMapper.mapToParameterValues(
      genericValue,
      allocationParameters,
      []
    );
    const dto: RequestAcceptanceModel = {
      poolId,
      id: request.id,
      allocationValues: resourceTypeParams,
      comment,
    };
    accept(dto);
  };
}
