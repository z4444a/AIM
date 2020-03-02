import React from 'react';
import { Dialog, DialogTitle, Tooltip } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import HistoryIcon from '@material-ui/icons/History';
import { WithTranslation } from 'react-i18next';
import { Style } from './styles';
import DialogContent from '@material-ui/core/DialogContent';
import CloseIcon from '@material-ui/icons/Close';
import { RequestStatusChangeGetModel } from '../../../../model/get/request-status-change-get-model';
import Table from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import { DateFormat } from '../../../../commons/values/date-format';
import RequestStatus from '../request-status/index';
import Moment from 'react-moment';
import TableBody from '@material-ui/core/TableBody';

interface Props {
  fetchHistory: () => void;
  history: RequestStatusChangeGetModel[];
  show: boolean;
}
export type InternalProps = Props & Style & WithTranslation;
interface State {
  open: boolean;
}
export class HistoryDialog extends React.PureComponent<InternalProps, State> {
  constructor(props: InternalProps) {
    super(props);
    this.state = {
      open: false,
    };
  }

  public render(): React.ReactNode {
    const { t, classes, history, show } = this.props;
    if (!show) {
      return <div />;
    }
    const { open } = this.state;
    return (
      <div>
        <Dialog open={open} maxWidth="md" onBackdropClick={() => this.close()}>
          <div className={classes.flex}>
            <DialogTitle>{t('requestAcceptPage.headers.history')}</DialogTitle>
            <IconButton onClick={() => this.close()}>
              <CloseIcon />
            </IconButton>
          </div>
          <DialogContent className={classes.paper}>
            <Table padding="checkbox">
              <TableHead>
                <TableRow>
                  <TableCell>{t('requestAcceptPage.historyFields.datetime')}</TableCell>
                  <TableCell>{t('requestAcceptPage.historyFields.status')}</TableCell>
                  <TableCell>{t('requestAcceptPage.historyFields.author')}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {history.length !== 0 && history.map(row => HistoryDialog.renderRow(row))}
              </TableBody>
            </Table>
          </DialogContent>
        </Dialog>
        <Tooltip title={t('requestAcceptPage.tooltips.history')}>
          <div>
            <IconButton onClick={this.openDialog} disabled={open}>
              <HistoryIcon />
            </IconButton>
          </div>
        </Tooltip>
      </div>
    );
  }
  private static renderRow(row: RequestStatusChangeGetModel) {
    return (
      <TableRow key={row.id.toString()}>
        <TableCell>
          <Moment date={row.datetime} format={DateFormat.ISO_DATE_TIME} />
        </TableCell>
        <TableCell>
          <RequestStatus status={row.status} />
        </TableCell>
        <TableCell>{row.author.name}</TableCell>
      </TableRow>
    );
  }
  private openDialog = () => {
    const { fetchHistory } = this.props;
    fetchHistory();
    this.setState({ open: true });
  };
  private close = () => {
    this.setState({ open: false });
  };
}
