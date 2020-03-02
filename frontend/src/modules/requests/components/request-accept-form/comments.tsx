import React, { ReactNode } from 'react';
import { ExpansionPanelDetails, Paper } from '@material-ui/core';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import withStyles from '@material-ui/core/styles/withStyles';
import { Style, styles } from './styles';
import { WithTranslation, withTranslation } from 'react-i18next';
import { CommentGetModel } from '../../../../model/get/comment-get-model';

interface State {
  open: boolean;
}
interface Props {
  comments: CommentGetModel[];
}
export type InternalProps = Props & Style & WithTranslation;
class Comments extends React.PureComponent<InternalProps, State> {
  constructor(props: InternalProps) {
    super(props);
    this.state = {
      open: true,
    };
  }
  render(): React.ReactNode {
    const { classes, t } = this.props;
    const { open } = this.state;
    return (
      <Paper
        classes={{
          root: classes.descriptionPanel,
        }}
      >
        <ExpansionPanel onChange={() => this.setState({ open: !open })} expanded={open}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} className={classes.boldText}>
            {t('requestAcceptPage.fields.comments')}:
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <div> {this.getComments()}</div>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </Paper>
    );
  }
  private getComments = (): ReactNode => {
    const { comments } = this.props;

    return comments.map((value, index) => {
      const item = value;
      const date: Date = new Date(item.datetime);
      return (
        <div key={index.toString()}>
          <p>
            <b>{item.author.name}</b> добавил(а) комментарий -{' '}
            {date.toLocaleTimeString('ru', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: 'numeric',
              minute: 'numeric',
            })}
          </p>
          <p>{item.content}</p>
        </div>
      );
    });
  };
}

export default withStyles(styles)(withTranslation('common')(Comments));
