import React, { ChangeEvent, KeyboardEvent } from 'react';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import FormLabel from '@material-ui/core/FormLabel';
import TextField from '@material-ui/core/TextField';
import ResourcePoolParams from '../../../commons/parameters/resource-pool-parameters';

const styles = (theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      flexDirection: 'column',
      padding: theme.spacing.unit,
    },
    item: {
      width: '100%',
      marginTop: theme.spacing.unit,
    },
  });

type Styles = WithStyles<'container' | 'item'>;

interface Props {
  onSearchClick: (params?: Partial<ResourcePoolParams>) => void;
}

interface State {
  nameField: string;
  activeField: boolean | undefined;
}

class ResourcePoolSearchForm extends React.Component<Styles & Props, State> {
  public constructor(props: Readonly<Styles & Props>) {
    super(props);
    this.state = {
      nameField: '',
      activeField: undefined,
    };
    this.handleSearchClick = this.handleSearchClick.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  private handleSearchClick() {
    const params: Partial<ResourcePoolParams> = {
      name: this.state.nameField.length ? this.state.nameField : undefined,
      active: this.state.activeField,
    };
    this.props.onSearchClick(params);
  }

  private handleTextChange(event: ChangeEvent<HTMLInputElement>) {
    this.setState({ nameField: event.target.value });
  }

  private handleKeyPress(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === 'Enter') {
      const params: Partial<ResourcePoolParams> = {
        name: this.state.nameField.length ? this.state.nameField : undefined,
        active: this.state.activeField,
      };
      event.preventDefault();
      this.props.onSearchClick(params);
    }
  }

  public render(): JSX.Element {
    const { classes } = this.props;
    return (
      <form className={classes.container}>
        <FormLabel>Поиск</FormLabel>
        <Divider />
        <TextField
          className={classes.item}
          label="Наименование пула "
          value={this.state.nameField}
          onChange={this.handleTextChange}
          onKeyPress={this.handleKeyPress}
        />
        <Button className={classes.item} variant="contained" onClick={this.handleSearchClick}>
          Искать
        </Button>
      </form>
    );
  }
}

export default withStyles(styles)(ResourcePoolSearchForm);
