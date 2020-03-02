import { getType } from 'typesafe-actions';
import { fetchOwnersTypesChart } from '../actions/owners-types-chart';
import { OwnersAmountResourceType } from '../../model/get/owners-types-chart';
import { RootAction } from 'typesafe-actions';

const ownersTypesChartReducer = (
  state: OwnersAmountResourceType[] | null = [],
  action: RootAction
): OwnersAmountResourceType[] | null => {
  switch (action.type) {
    case getType(fetchOwnersTypesChart.request):
      return state;
    case getType(fetchOwnersTypesChart.success):
      return action.payload;
    case getType(fetchOwnersTypesChart.failure):
    default:
      return state;
  }
};

export default ownersTypesChartReducer;
