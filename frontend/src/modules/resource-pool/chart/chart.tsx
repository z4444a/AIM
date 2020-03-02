import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from 'recharts';
import { OwnersAmountResourceType } from '../../../model/get/owners-types-chart';
import ChangeData from './change-data';
import { connect } from 'react-redux';
import { RootState } from 'typesafe-actions';

const color = [
  '#9af000',
  '#00c15a',
  '#009ea8',
  '#006e9d',
  '#cef800',
  '#19da00',
  '#003890',
  '#70e900',
  '#00ba74',
  '#00af9b',
];

interface State {
  column: Column[];
  firstOpen: boolean;
}

interface Column {
  name: string;
  color: string;
}

interface StoreProps {
  chart: OwnersAmountResourceType[];
}

const DataFormater = (number: number) => {
  if (number % 1 !== 0) {
    return '';
  } else {
    return number.toString();
  }
};

export interface DataToChart {
  owners: number[];
  resourceTypes: number[];
}

class Chart extends React.Component<StoreProps, State> {
  public constructor(props: StoreProps) {
    super(props);

    this.state = {
      column: this.toColumnName(this.props.chart),
      firstOpen: true,
    };
  }

  private getDateToBarChartDate(
    data: OwnersAmountResourceType[]
  ): { [key: string]: number | string }[] {
    if (data === null || data === undefined || data === []) {
      return [];
    }
    const returnData: { [key: string]: number | string }[] = [];
    for (let i = 0; i < data.length; i++) {
      const obj: { [key: string]: number | string } = {};
      obj.owner = data[i].name;
      data[i].amountTypes.forEach(item => {
        obj[item.name] = item.amount;
      });
      returnData[i] = obj;
    }
    return returnData;
  }

  private toColumnName(chart: OwnersAmountResourceType[]): Column[] {
    if (chart === undefined || chart.length === 0 || chart === null) {
      return [];
    }

    const types = chart[0].amountTypes;
    const columnName: Column[] = [];
    for (let i = 0; i < types.length; i++) {
      columnName[i] = { name: types[i].name, color: color[i % 10] };
    }
    return columnName;
  }

  public render(): JSX.Element {
    return (
      <Grid>
        <Grid container justify="center">
          <Grid item>
            <BarChart
              width={this.props.chart.length === 0 ? 0 : 600}
              height={this.props.chart.length === 0 ? 0 : 500}
              data={this.getDateToBarChartDate(this.props.chart)}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid />
              <XAxis dataKey="owner" />
              <YAxis tickFormatter={DataFormater} />
              <Tooltip />
              <Legend />
              {this.toColumnName(this.props.chart).map(item => (
                <Bar key={item.name} dataKey={item.name} fill={item.color} />
              ))}
            </BarChart>
          </Grid>
          <Grid item>
            <Grid container>
              <Paper>
                <ChangeData />
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = (state: RootState): StoreProps => ({
  chart: state.ownersTypesChart ? state.ownersTypesChart : [],
});

const mapDispatchToProps = () => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Chart);
