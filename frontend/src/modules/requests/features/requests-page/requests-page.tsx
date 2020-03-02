import React from 'react';
import { Path } from '../../../../commons/path';
import {
  FilterValueType,
  Props as DataGridProps,
} from '../../../../commons/components/aim-data-grid/aim-data-grid';
import AimDataGrid from '../../../../commons/components/aim-data-grid';
import { SortOrder } from '../../../resource-pool/SortOrder';
import { MUIDataTableColumn } from 'mui-datatables';
import { WithTranslation } from 'react-i18next';
import { mapDispatchToProps, mapStateToProps } from './index';
import moment from 'moment';
import { DateFormat } from '../../../../commons/values/date-format';
import { RequestParams } from '../../../../model/parameters/request-params';
import RequestModel from '../../../../model/get/request-model';
import NamedModel from '../../../../model/base/named-model';
import { RequestState } from '../../../../model/get/request-state';
import AddCircle from '@material-ui/icons/AddCircle';
import FiberManualRecord from '@material-ui/icons/FiberManualRecord';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import RequestFilterPanel from '../../components/request-filter-panel/index';
import { FilterField } from '../../components/request-filter-panel/request-filter-panel';
import RequestStatus from '../../components/request-status/index';
import { SuggestionItem } from '../../../../commons/components/aim-autocomplete/aim-autocomplete';
import FullParameterModel from '../../../../model/get/full-parameter-model';
import { ParameterType } from '../../../../model/parameter-type';
import {
  DateFieldValue,
  GenericFieldValue,
  GenericFormValue,
  ListFieldValue,
  NumberFieldValue,
  TextFieldValue,
} from '../../../../commons/components/generic-fields/models/field-config.model';
import ParamValueShortVer from '../../../../model/get/param-value-short-ver';
import { Role } from '../../../../commons/role';
import { ParameterModifier } from '../../../../model/parameter-modifier';
import { parameterShortVersionList } from '../../../../commons/components/parameter-short-version-list/parameter-short-version-list';

export type Props = ReturnType<typeof mapDispatchToProps> &
  ReturnType<typeof mapStateToProps> &
  WithTranslation;

export function getFieldValue(
  param: FullParameterModel,
  field: GenericFormValue
): GenericFieldValue | undefined {
  const item: GenericFormValue = field ? field : {};
  const paramValues = item[param.id];
  const type = param.parameterType ? param.parameterType : '';
  switch (type) {
    case ParameterType.DATE: //TODO: multiple
      return (paramValues[0] as unknown) as DateFieldValue;
    case ParameterType.NUMBER:
      return (paramValues[0] as unknown) as NumberFieldValue;
    case ParameterType.REAL:
      return (paramValues[0] as unknown) as NumberFieldValue;
    case ParameterType.TEXT:
      return paramValues[0] as TextFieldValue;
    case ParameterType.LIST:
      const param = (paramValues[0] as unknown) as ListFieldValue;
      return param ? param[0] : undefined;
    default:
      return undefined;
  }
}

export class RequestsPage extends React.Component<Props> {
  private readonly colDefs: MUIDataTableColumn[];
  private readonly gridConfig: Partial<DataGridProps>;

  public constructor(props: Props) {
    super(props);
    this.gridConfig = this.getGridConfig();
    this.colDefs = this.getGridColumnsConfig();
  }

  public componentDidMount(): void {
    const { fetchTypeSuggestions } = this.props;
    fetchTypeSuggestions();
    this.props.fetchRequests(this.props.params);
  }

  public componentWillUnmount(): void {
    const { resetParams } = this.props;
    resetParams();
  }

  public render(): JSX.Element {
    const { requests, params, showFilterPanel } = this.props;
    const sort = {
      sortBy: params.sortBy as string,
      direction: params.order,
    };

    if (!requests) {
      return <div />;
    }

    const filter: { [key: string]: FilterValueType } = {};
    if (params.typeName) {
      filter[FilterField.RESOURCE_TYPE] = params.typeName;
    }
    if (params.description) {
      filter[FilterField.DESCRIPTION] = params.description;
    }
    if (params.statusId) {
      filter[FilterField.STATUS] = params.statusId;
    }
    return (
      <AimDataGrid
        columns={this.colDefs}
        data={requests.content}
        totalPageCount={requests.totalElements}
        rowsPerPage={params.pageSize}
        sort={sort}
        filterPanelOpen={showFilterPanel}
        filterValues={filter}
        {...this.gridConfig}
      />
    );
  }

  private getGridConfig(): Partial<DataGridProps> {
    const { t } = this.props;
    const gridConfig: Partial<DataGridProps> = {
      pageTitle: t('requestPage.header'),
      onColumnSortChange: (changedColumn, direction) =>
        this.handleColumnSortChange(changedColumn, direction),
      onChangePage: currentPage => this.handleChangePage(currentPage),
      onChangeRowsPerPage: numberOfRows => this.handleChangeRowsPerPage(numberOfRows),
      renderCustomFilterCmp: () => (
        <RequestFilterPanel
          context={this.getValue()}
          getResourceTypeSuggestions={this.getResourceTypeSuggestions}
          onResourceTypeSelected={this.handleResourceTypeSelected}
          resourceTypeParameters={this.getParameters()}
          onFiltersChanged={this.handleOnFiltersChanged}
        />
      ),
      onFilterChange: this.handleFilterChange,
      toggleFilterPanel: this.toggleShowFilterPanel,
      customToolbar: () => {
        return (
          <Tooltip title={t('requestPage.buttons.createRequest')}>
            <IconButton onClick={() => this.props.redirect(Path.REQUEST_CREATE)}>
              <AddCircle />
            </IconButton>
          </Tooltip>
        );
      },
      onRowClick: (rowData, rowMeta, dataItem) => this.handleRedirect(dataItem as RequestModel),
    };

    return gridConfig;
  }

  private toggleShowFilterPanel = (showFilterPanel: boolean) => {
    const { toggleFilterPanel } = this.props;
    toggleFilterPanel(showFilterPanel);
  };

  private getValue = (): { [key: string]: FilterValueType } => {
    return this.props.filters.values ? this.props.filters.values : {};
  };

  private getParameters = (): FullParameterModel[] => {
    return this.props.filters &&
      this.props.filters.values &&
      this.props.filters.values[FilterField.RESOURCE_TYPE]
      ? this.props.resourceTypeParametersList
      : [];
  };

  private handleOnFiltersChanged = (value: { [key: string]: FilterValueType }) => {
    const { updateFilters, filters } = this.props;
    const filter = Object.assign({}, filters);
    filter.values = value;
    updateFilters(filter);
  };

  private getResourceTypeSuggestions = (value: string) => {
    const { typeSuggestions } = this.props;
    const result: SuggestionItem[] =
      !typeSuggestions || typeSuggestions.length === 0
        ? []
        : typeSuggestions.map(item => {
            const suggestionItem: SuggestionItem = {
              value: item.name,
              key: item.id,
            };
            return suggestionItem;
          });
    return result.filter(item =>
      item.value.toLocaleLowerCase().includes(value.toLocaleLowerCase())
    );
  };

  private getGridColumnsConfig(): MUIDataTableColumn[] {
    const { t, user } = this.props;
    const colDefs: MUIDataTableColumn[] = [
      {
        label: t('requestPage.grid.columns.id'),
        name: 'id',
        options: {
          display: 'false',
        },
      },
      {
        label: t('requestPage.grid.columns.creation'),
        name: 'creation',
        options: {
          customBodyRender: (creation: number) => moment(creation).format(DateFormat.ISO_DATE_TIME),
        },
      },
      {
        label: t('requestPage.grid.columns.type'),
        name: 'type',
        options: {
          customBodyRender: (type: NamedModel) => (type ? type.name : ''),
        },
      },
      {
        label: t('requestPage.grid.columns.project'),
        name: 'project',
        options: {
          customBodyRender: (project: NamedModel) => (project ? project.name : ''),
        },
      },
      {
        label: t('requestPage.grid.columns.author'),
        name: 'author',
        options: {
          customBodyRender: (author: NamedModel) => (author ? author.name : ''),
        },
      },
      {
        label: t('requestPage.grid.columns.owner'),
        name: 'owner',
        options: {
          display: 'false',
          customBodyRender: (owner: NamedModel) => (owner ? owner.name : ''),
        },
      },
      {
        label: t('requestPage.grid.columns.state'),
        name: 'state',
        options: {
          display: 'false',
          customBodyRender: (state: RequestState) => {
            if (!state) {
              return null;
            }
            switch (state) {
              case RequestState.ACTIVE:
                return <FiberManualRecord style={{ color: 'green', alignSelf: 'center' }} />;
              case RequestState.INACTIVE:
                return <FiberManualRecord style={{ color: 'red' }} />;
              default:
                return null;
            }
          },
        },
      },
      {
        label: t('requestPage.grid.columns.status'),
        name: 'status',
        options: {
          customBodyRender: (status: NamedModel) => {
            if (!status) {
              return null;
            }
            return <RequestStatus status={status} />;
          },
        },
      },
      {
        label: t('requestPage.grid.columns.parameters'),
        name: 'parameterValues',
        options: {
          customBodyRender: (parameterValues: ParamValueShortVer[]) => {
            if (!parameterValues || parameterValues.length === 0) {
              return '';
            }
            let renderParams = parameterValues;
            if (user !== null && user.role !== Role.ADMIN) {
              renderParams = renderParams.filter(
                param => param.modifier !== ParameterModifier.ALLOCATION_PARAMETER
              );
            }
            return parameterShortVersionList(renderParams);
          },
        },
      },
    ];
    return colDefs;
  }

  private handleColumnSortChange(changedColumn: string, direction: SortOrder) {
    const changeParams: Partial<RequestParams> = {
      sortBy: changedColumn as keyof RequestModel,
      order: direction,
    };
    this.handleChange(changeParams);
  }

  private handleResourceTypeSelected = (value: SuggestionItem) => {
    const { resetResourceTypeParameters, setResourceTypeParameters, typeSuggestions } = this.props;
    if (value && value.key) {
      const params = typeSuggestions.find(item => item.id === value.key);
      setResourceTypeParameters(params ? params.parameters : []);
    } else {
      resetResourceTypeParameters();
    }
  };

  private handleChangePage(currentPage: number) {
    const changeParams: Partial<RequestParams> = {
      page: currentPage,
    };
    this.handleChange(changeParams);
  }

  private handleChangeRowsPerPage(numberOfRows: number) {
    const changeParams: Partial<RequestParams> = {
      pageSize: numberOfRows,
    };
    this.handleChange(changeParams);
  }

  private handleFilterChange = (
    value: { [key: string]: FilterValueType },
    clear: boolean | undefined
  ) => {
    if (clear) {
      const filters = Object.assign({}, this.props.filters);
      filters.values = {};
      this.props.updateFilters(filters);
      this.handleChange();
      return;
    }
    const values = this.props.filters.values ? this.props.filters.values : {};
    const { resourceTypeParametersList } = this.props;
    const changeParams: any = {
      typeName: values[FilterField.RESOURCE_TYPE]
        ? values[FilterField.RESOURCE_TYPE] + ''
        : undefined,
      description: values[FilterField.DESCRIPTION]
        ? values[FilterField.DESCRIPTION] + ''
        : undefined,
      statusId: values[FilterField.STATUS] ? values[FilterField.STATUS] + '' : undefined,
    };

    if (resourceTypeParametersList && resourceTypeParametersList.length !== 0) {
      resourceTypeParametersList.forEach(
        (param: FullParameterModel) =>
          (changeParams[param.id] = getFieldValue(param, values[
            FilterField.PARAMS
          ] as GenericFormValue))
      );
    }
    this.handleChange(changeParams);
  };

  private handleChange(changeParams?: any): void {
    const { params } = this.props;
    const newParams: RequestParams = Object.assign(
      {},
      {
        order: params.order,
        page: params.page,
        pageSize: params.pageSize,
      },
      changeParams
    );
    this.props.fetchRequests(
      changeParams
        ? newParams
        : {
            typeName: undefined,
            description: undefined,
            statusId: undefined,
            order: params.order,
            page: params.page,
            pageSize: params.pageSize,
          }
    );
  }

  private handleRedirect(request: RequestModel) {
    const idAsString: string = request.id.toString(10);
    this.props.redirect(Path.REQUEST_CARD.replace(':id', idAsString));
  }
}
