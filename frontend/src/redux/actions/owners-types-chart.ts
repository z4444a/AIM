import { createAsyncAction } from 'typesafe-actions';
import { DataToChart } from '../../modules/resource-pool/chart/chart';
import { OwnersAmountResourceType } from '../../model/get/owners-types-chart';

enum OwnersTypesChartActionType {
  CHART_REQUEST = 'CHART',
  CHART_SUCCESS = 'CHART_SUCCESS',
  CHART_FAILURE = 'CHART_FAILURE',
}
export const fetchOwnersTypesChart = createAsyncAction(
  OwnersTypesChartActionType.CHART_REQUEST,
  OwnersTypesChartActionType.CHART_SUCCESS,
  OwnersTypesChartActionType.CHART_FAILURE
)<DataToChart, OwnersAmountResourceType[], Error>();
