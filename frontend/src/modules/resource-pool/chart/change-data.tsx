import React from 'react';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import FormLabel from '@material-ui/core/FormLabel';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import { fetchAllEmployees } from '../../../redux/actions/employee_action';
import { fetchAllActiveResourceTypes } from '../../../redux/actions/resource-type-actions';
import { connect } from 'react-redux';
import { RootState } from 'typesafe-actions';
import { DataToChart } from './chart';
import { fetchOwnersTypesChart } from '../../../redux/actions/owners-types-chart';
import NamedModel from '../../../model/base/named-model';

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

type Styles = WithStyles<typeof styles>;

interface State {
  employees: NamedModel[];
  resourceTypes: NamedModel[];
}

interface DispatchProps {
  fetchEmployees: () => void;
  fetchResourceTypes: () => void;
  changeChart: (body: DataToChart) => void;
}

type Props = DispatchProps & State & Styles;

class ChangeData extends React.Component<Props, State> {
  public constructor(props: Props) {
    super(props);
    this.state = {
      resourceTypes: [],
      employees: [],
    };
    this.handleClick = this.handleClick.bind(this);
  }

  public componentDidMount(): void {
    this.props.fetchEmployees();
    this.props.fetchResourceTypes();
  }

  private toNames(owners: NamedModel[]): string[] {
    let names: string[];
    if (owners[0] === undefined) {
      names = [];
    } else {
      names = [owners[0].name];
      for (let i = 1; i < owners.length; i++) {
        names[i] = owners[i].name;
      }
    }
    return names;
  }

  private handleClick() {
    let ownerValue: number[];
    if (this.state.employees[0] === undefined) {
      ownerValue = [];
    } else {
      ownerValue = [this.state.employees[0].id];
      for (let i = 1; i < this.state.employees.length; i++) {
        ownerValue[ownerValue.length] = this.state.employees[i].id;
      }
    }

    let resourceTypesValue: number[];
    if (this.state.resourceTypes[0] === undefined) {
      resourceTypesValue = [];
    } else {
      resourceTypesValue = [this.state.resourceTypes[0].id];
      for (let i = 1; i < this.state.resourceTypes.length; i++) {
        resourceTypesValue[resourceTypesValue.length] = this.state.resourceTypes[i].id;
      }
    }

    this.props.changeChart({
      owners: ownerValue,
      resourceTypes: resourceTypesValue,
    });
  }

  public render(): JSX.Element {
    const { classes } = this.props;
    return (
      <form className={classes.container}>
        <FormLabel>Данные для отображения на графике</FormLabel>
        <Divider />

        <FormControl>
          <InputLabel htmlFor="select-multiple">Выберите владельцев</InputLabel>
          <Select
            multiple
            value={this.toNames(this.state.employees)}
            onChange={e => {
              let ownerValue: NamedModel[];
              if (e.target.value[0] === undefined) {
                ownerValue = [];
              } else {
                let id;
                for (let i = 0; i < this.props.employees.length; i++) {
                  if (this.props.employees[i].name === e.target.value[0]) {
                    id = this.props.employees[i].id;
                  }
                }
                ownerValue = [{ id: id ? id : 0, name: e.target.value[0] }];
                for (let i = 1; i < e.target.value.length; i++) {
                  for (let j = 0; j < this.props.employees.length; j++) {
                    if (this.props.employees[j].name === e.target.value[i]) {
                      id = this.props.employees[j].id;
                    }
                  }
                  ownerValue[ownerValue.length] = {
                    id: id ? id : 0,
                    name: e.target.value[i],
                  };
                }
              }
              this.setState({ employees: ownerValue });
            }}
            input={<Input id="select-multiple" />}
          >
            {this.props.employees.map(owner => (
              <MenuItem key={owner.id} value={owner.name}>
                {owner.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl>
          <InputLabel htmlFor="select-multiple">Выберите типы ресурсов</InputLabel>
          <Select
            multiple
            value={this.toNames(this.state.resourceTypes)}
            onChange={e => {
              let ownerValue: NamedModel[];
              if (e.target.value[0] === undefined) {
                ownerValue = [];
              } else {
                let id;
                for (let i = 0; i < this.props.resourceTypes.length; i++) {
                  if (this.props.resourceTypes[i].name === e.target.value[0]) {
                    id = this.props.resourceTypes[i].id;
                  }
                }
                ownerValue = [{ id: id ? id : 0, name: e.target.value[0] }];
                for (let i = 1; i < e.target.value.length; i++) {
                  for (let j = 0; j < this.props.resourceTypes.length; j++) {
                    if (this.props.resourceTypes[j].name === e.target.value[i]) {
                      id = this.props.resourceTypes[j].id;
                    }
                  }
                  ownerValue[ownerValue.length] = {
                    id: id ? id : 0,
                    name: e.target.value[i],
                  };
                }
              }
              this.setState({ resourceTypes: ownerValue });
            }}
            input={<Input id="select-multiple" />}
          >
            {this.props.resourceTypes.map(owner => (
              <MenuItem key={owner.id} value={owner.name}>
                {owner.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button
          className={classes.item}
          variant="contained"
          onClick={() => {
            this.handleClick();
          }}
        >
          Отобразить
        </Button>
      </form>
    );
  }
}

const mapStateToProps = (state: RootState): State => ({
  employees: state.employees ? state.employees : [],
  resourceTypes: state.resourceActiveTypes ? state.resourceActiveTypes : [],
});

const mapDispatchToProps = (dispatch: Function): DispatchProps => ({
  fetchEmployees: () => dispatch(fetchAllEmployees.request()),
  fetchResourceTypes: () => dispatch(fetchAllActiveResourceTypes.request()),
  changeChart: (body: DataToChart) => dispatch(fetchOwnersTypesChart.request(body)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(ChangeData));
