import React, { ChangeEvent } from 'react';
import { mapStateToProps } from './index';
import FullParameterModel from '../../../../model/get/full-parameter-model';

import { WithTranslation } from 'react-i18next';
import { Paper } from '@material-ui/core';
import { Style } from './styles';
import { ParameterType } from '../../../../model/parameter-type';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import _ from 'underscore';
import { ParameterValueFormModel } from '../../../../model/form/parameter-value-form-model';

export interface Props {
  header: string;
  parameters: FullParameterModel[];
  fetchParameters: () => void;
  amount?: Row;
}
export type InternalProps = Props & Style & WithTranslation & ReturnType<typeof mapStateToProps>;
interface Row {
  parameter: string | null;
  value: string | null;
}
interface State {
  rows: Row[];
  open: boolean;
}
export class ParameterValuesCard extends React.PureComponent<InternalProps, State> {
  public constructor(props: InternalProps) {
    super(props);
    this.state = {
      rows: [],
      open: true,
    };
  }

  public componentDidMount(): void {
    const { fetchParameters } = this.props;
    fetchParameters();
  }

  public componentDidUpdate(prevProps: Readonly<InternalProps>, prevState: Readonly<State>): void {
    const { parameters, values, amount } = this.props;
    if (_.isEqual(prevProps.parameters, parameters) && _.isEqual(prevProps.values, values)) {
      return;
    }
    if (!parameters || parameters.length === 0) {
      return;
    }
    let nullableRows = parameters.map(parameter => this.getRow(parameter, values));
    if (amount) {
      nullableRows = [amount, ...nullableRows];
    }
    this.setState({
      rows: nullableRows.filter(row => row.parameter !== null),
    });
  }

  public render(): React.ReactNode {
    const { t, classes, parameters, header } = this.props;
    const { rows, open } = this.state;
    if (parameters.length === 0) {
      return <div />;
    }
    return (
      <Paper
        classes={{
          root: classes.panelContainer,
        }}
      >
        <ExpansionPanel onChange={this.handleChange} expanded={open}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} className={classes.header}>
            {t(`typeCard.parameters.${header}`)}:
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>{t('parameters.dialogue.title')}</TableCell>
                  <TableCell align="left">{t('listValues.contentLabel')}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map(
                  row =>
                    row.parameter && (
                      <TableRow key={row.parameter}>
                        <TableCell component="th" scope="row">
                          {row.parameter}
                        </TableCell>
                        <TableCell align="left">{row.value}</TableCell>
                      </TableRow>
                    )
                )}
              </TableBody>
            </Table>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </Paper>
    );
  }
  private handleChange = (event: ChangeEvent<{}>, expand: boolean) => {
    this.setState({
      open: expand,
    });
  };
  private getRow(param: FullParameterModel, values: ParameterValueFormModel[]): Row {
    const paramValue = values.find((value: ParameterValueFormModel) => {
      return value.parameterId === param.id;
    });
    if (!paramValue) {
      return {
        parameter: null,
        value: null,
      };
    }
    switch (param.parameterType) {
      case ParameterType.DATE:
        if (paramValue.dateValue) {
          const value: Date = paramValue.dateValue;
          return {
            parameter: param.name,
            value: value.toString(),
          };
        }
        break;
      case ParameterType.NUMBER:
        if (paramValue.numberValue || paramValue.numberValue === 0) {
          const value: number = paramValue.numberValue;
          return {
            parameter: param.name,
            value: value.toString(),
          };
        }
        break;
      case ParameterType.TEXT:
        if (paramValue.stringValue) {
          const value: string = paramValue.stringValue;
          return {
            parameter: param.name,
            value: value.toString(),
          };
        }
        break;
      case ParameterType.REAL:
        if (paramValue.realValue || paramValue.realValue === 0) {
          const value: number = paramValue.realValue;
          return {
            parameter: param.name,
            value: value.toString(),
          };
        }
        break;
      case ParameterType.LIST:
        if (paramValue.listValue) {
          const baseValue = paramValue.listValue;
          let value = '';
          if (param.constraint) {
            const listValue = param.constraint.listValues.find(value => value.id === baseValue.id);
            value = listValue ? listValue.content : '';
          }
          return {
            parameter: param.name,
            value: value.toString(),
          };
        }
        break;
      default:
        return {
          parameter: param.name,
          value: null,
        };
    }
    return {
      parameter: null,
      value: null,
    };
  }
}
