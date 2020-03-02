import React from 'react';
import { Dialog, DialogTitle } from '@material-ui/core';
import { Style } from './styles';
import { WithTranslation } from 'react-i18next';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';

export interface WarningDialogProps {
  open: boolean;
  confirmAction: () => void;
  cancelAction: () => void;
  header: string | React.ReactNode;
  content: string | React.ReactNode;
}
type InternalProps = WarningDialogProps & Style & WithTranslation;
export class WarningDialog extends React.PureComponent<InternalProps> {
  render(): React.ReactNode {
    const { t, classes, confirmAction, cancelAction, header, open, content } = this.props;
    return (
      <Dialog open={open} maxWidth="md" onBackdropClick={cancelAction}>
        <DialogTitle>{header}</DialogTitle>
        <DialogContent>
          <div className={classes.flexCenter}>{content}</div>
          <div className={classes.flexBetween}>
            <Button onClick={cancelAction}>{t('common.cancel')}</Button>
            <Button onClick={confirmAction}>{t('common.continue')}</Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }
}
