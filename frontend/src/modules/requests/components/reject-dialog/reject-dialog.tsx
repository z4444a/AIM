import { WithTranslation } from 'react-i18next';
import React from 'react';
import { Dialog, DialogTitle } from '@material-ui/core';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Style } from './styles';

export interface Props {
  open: boolean;
  close: () => void;
  submit: (comment: string) => void;
  comment: string;
  updateComment: (content: string) => void;
  resetComment: () => void;
}
export interface State {
  error: boolean;
}
export type InternalProps = Props & WithTranslation & Style;

export class RejectDialog extends React.PureComponent<InternalProps, State> {
  public constructor(props: InternalProps) {
    super(props);
    this.state = {
      error: false,
    };
  }

  public componentWillUnmount(): void {
    const { resetComment } = this.props;
    resetComment();
  }

  public render(): React.ReactNode {
    const { open, classes, t, close, comment } = this.props;
    const { error } = this.state;
    return (
      <Dialog open={open} maxWidth="md">
        <DialogTitle>{t('requestAcceptPage.headers.reject')}</DialogTitle>
        <DialogContent className={classes.paper}>
          <TextField
            className={classes.textInput}
            required
            error={error}
            label={t('requestAcceptPage.label.rejectReason')}
            helperText={error ? t('constraints.requiredField') : undefined}
            multiline
            value={comment}
            onChange={this.handleChange}
          />
          <div className={classes.buttonsPosition}>
            <Button onClick={close}>{t('common.cancel')}</Button>
            <Button onClick={this.submit}>{t('common.complete')}</Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  private handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { updateComment } = this.props;
    this.setState({
      error: false,
    });
    updateComment(event.target.value);
  };
  private submit = () => {
    const { submit, comment } = this.props;
    if (this.checkTextField()) {
      submit(comment);
    }
  };
  private checkTextField(): boolean {
    const error: boolean = this.props.comment === '';
    this.setState({
      error: error,
    });
    return !error;
  }
}
