import React from 'react';
import { ExpansionPanelDetails, Paper } from '@material-ui/core';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import withStyles from '@material-ui/core/styles/withStyles';
import { Style, styles } from './styles';
import { WithTranslation, withTranslation } from 'react-i18next';

interface State {
  open: boolean;
}
interface Props {
  content: string;
}
export type InternalProps = Props & Style & WithTranslation;
class Description extends React.PureComponent<InternalProps, State> {
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
            {t('requestAcceptPage.fields.description')}:
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <p className={classes.hidden}>{this.props.content}</p>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </Paper>
    );
  }
}
export default withStyles(styles)(withTranslation('common')(Description));
