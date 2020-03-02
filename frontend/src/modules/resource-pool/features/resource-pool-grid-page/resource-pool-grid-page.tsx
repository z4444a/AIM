import React from 'react';
import { Path } from '../../../../commons/path';
import {
  FilterValueType,
  Props as DataGridProps,
} from '../../../../commons/components/aim-data-grid/aim-data-grid';
import AimDataGrid from '../../../../commons/components/aim-data-grid';
import { SortOrder } from '../../SortOrder';
import { MUIDataTableColumn } from 'mui-datatables';
import { WithTranslation } from 'react-i18next';
import { mapDispatchToProps, mapStateToProps } from './index';
import ResourcePoolParams from '../../../../commons/parameters/resource-pool-parameters';
import ResourcePoolModel, { Name, ResourceType } from '../../../../model/get/resource-pool-model';
import IconButton from '@material-ui/core/IconButton';
import BarChart from '@material-ui/icons/BarChart';
import AddCircle from '@material-ui/icons/AddCircle';
import Tooltip from '@material-ui/core/Tooltip';
import ResourcePoolFilterPanel from '../../components/resource-pool-filter-panel/index';
import { FilterField } from '../../components/resource-pool-filter-panel/resource-pool-filter-panel';
import FiberManualRecord from '@material-ui/icons/FiberManualRecord';
import Edit from '@material-ui/icons/Edit';
import { SuggestionItem } from '../../../../commons/components/aim-autocomplete/aim-autocomplete';
import FullParameterModel from '../../../../model/get/full-parameter-model';
import { getFieldValue } from '../../../requests/features/requests-page/requests-page';
import { GenericFormValue } from '../../../../commons/components/generic-fields/models/field-config.model';
import { parameterShortVersionList } from '../../../../commons/components/parameter-short-version-list/parameter-short-version-list';

export type Props = ReturnType<typeof mapDispatchToProps> &
  ReturnType<typeof mapStateToProps> &
  WithTranslation;

export class ResourcePoolGridPage extends React.Component<Props> {
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
    this.props.fetch(this.props.params);
  }

  public render(): JSX.Element {
    const { params, datasource, showFilterPanel } = this.props;
    const sort = {
      sortBy: params.sortBy as string,
      direction: params.order,
    };

    if (!datasource) {
      return <div />;
    }

    const filter: { [key: string]: FilterValueType } = {};
    if (params.type) {
      filter[FilterField.TYPE] = params.type;
    }
    if (params.name) {
      filter[FilterField.NAME] = params.name;
    }
    if (params.active) {
      filter[FilterField.ACTIVE] = params.active;
    }
    return (
      <AimDataGrid
        columns={this.colDefs}
        data={datasource.content}
        totalPageCount={datasource.totalElements}
        rowsPerPage={params.pageSize}
        sort={sort}
        filterValues={filter}
        filterPanelOpen={showFilterPanel}
        {...this.gridConfig}
      />
    );
  }

  private getGridConfig(): Partial<DataGridProps> {
    const { t } = this.props;
    const gridConfig: Partial<DataGridProps> = {
      pageTitle: t('resourcePoolGridPage.header'),
      onColumnSortChange: (changedColumn, direction) =>
        this.handleColumnSortChange(changedColumn, direction),
      onChangePage: currentPage => this.handleChangePage(currentPage),
      onChangeRowsPerPage: numberOfRows => this.handleChangeRowsPerPage(numberOfRows),
      renderCustomFilterCmp: context => (
        <ResourcePoolFilterPanel
          role={this.props.role}
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
          <span>
            <Tooltip title={t('resourcePoolGridPage.buttons.createPool')}>
              <IconButton onClick={() => this.props.redirect(Path.RESOURCE_POOL_CREATE)}>
                <AddCircle />
              </IconButton>
            </Tooltip>
            <Tooltip title={t('resourcePoolGridPage.buttons.showChart')}>
              <IconButton
                aria-label="Edit"
                onClick={() => this.props.redirect(Path.RESOURCE_POOL_CHART)}
              >
                <BarChart />
              </IconButton>
            </Tooltip>
          </span>
        );
      },
    };

    return gridConfig;
  }

  private getValue = (): { [key: string]: FilterValueType } => {
    return this.props.filters.values ? this.props.filters.values : {};
  };

  private getParameters = (): FullParameterModel[] => {
    return this.props.filters &&
      this.props.filters.values &&
      this.props.filters.values[FilterField.TYPE]
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

  private handleResourceTypeSelected = (value: SuggestionItem) => {
    const { resetResourceTypeParameters, setResourceTypeParameters, typeSuggestions } = this.props;
    if (value && value.key) {
      const params = typeSuggestions.find(item => item.id === value.key);
      setResourceTypeParameters(params ? params.parameters : []);
    } else {
      resetResourceTypeParameters();
    }
  };

  private toggleShowFilterPanel = (showFilterPanel: boolean) => {
    const { toggleFilterPanel } = this.props;
    toggleFilterPanel(showFilterPanel);
  };

  private getGridColumnsConfig(): MUIDataTableColumn[] {
    const { t } = this.props;

    const colDefs: MUIDataTableColumn[] = [
      {
        label: t('resourcePoolGridPage.grid.columns.id'),
        name: 'id',
        options: {
          display: 'false',
        },
      },
      {
        label: t('resourcePoolGridPage.grid.columns.name'),
        name: 'name',
      },
      {
        label: t('resourcePoolGridPage.grid.columns.resourceType'),
        name: 'resourceType',
        options: {
          customBodyRender: (item: ResourceType) => (item ? item.name : ''),
        },
      },
      {
        label: t('resourcePoolGridPage.grid.columns.capacity'),
        name: 'capacity',
      },
      {
        label: t('resourcePoolGridPage.grid.columns.owners'),
        name: 'owners',
        options: {
          customBodyRender: (items: Name[]) => {
            if (!items || items.length === 0) {
              return '';
            }
            let str = '';
            items.map((value, index) => {
              str +=
                value.lastName + ' ' + value.firstName + (index < items.length - 1 ? ', ' : ' ');
              return str;
            });
            return str;
          },
        },
      },
      {
        label: t('resourcePoolGridPage.grid.columns.description'),
        name: 'description',
      },
      {
        label: t('resourcePoolGridPage.grid.columns.requestsAmount'),
        name: 'requestsAmount',
      },
      {
        label: t('resourcePoolGridPage.grid.columns.active'),
        name: 'active',
        options: {
          customBodyRender: (active: boolean) => {
            if (active) {
              return <FiberManualRecord style={{ color: 'green', alignSelf: 'center' }} />;
            } else {
              return <FiberManualRecord style={{ color: 'red' }} />;
            }
          },
        },
      },
      {
        label: t('requestPage.grid.columns.parameters'),
        name: 'parametersValues',
        options: {
          customBodyRender: parameterShortVersionList,
        },
      },
      {
        label: ' ',
        name: 'id',
        options: {
          customBodyRender: (id: number) => {
            return (
              <Tooltip title={t('resourcePoolGridPage.buttons.editPool')}>
                <IconButton onClick={() => this.handleRedirect(id.toString())}>
                  <Edit />
                </IconButton>
              </Tooltip>
            );
          },
        },
      },
    ];
    return colDefs;
  }

  private handleColumnSortChange(changedColumn: string, direction: SortOrder) {
    const changeParams: Partial<ResourcePoolParams> = {
      sortBy: changedColumn as keyof ResourcePoolModel,
      order: direction,
    };
    this.handleChange(changeParams);
  }

  private handleChangePage(currentPage: number) {
    const changeParams: Partial<ResourcePoolParams> = {
      page: currentPage,
    };
    this.handleChange(changeParams);
  }

  private handleChangeRowsPerPage(numberOfRows: number) {
    const changeParams: Partial<ResourcePoolParams> = {
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
      type: values[FilterField.TYPE] ? values[FilterField.TYPE] + '' : undefined,
      name: values[FilterField.NAME] ? values[FilterField.NAME] : undefined,
      active: values[FilterField.ACTIVE] !== undefined ? values[FilterField.ACTIVE] : undefined,
      onlyMine: values[FilterField.ONLY_MINE] !== undefined ? values[FilterField.ONLY_MINE] : true,
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
    const newParams: ResourcePoolParams = Object.assign(
      {},
      {
        order: params.order,
        page: params.page,
        pageSize: params.pageSize,
      },
      changeParams
    );
    this.props.fetch(
      changeParams
        ? newParams
        : {
            type: undefined,
            name: undefined,
            active: undefined,
            onlyMine: true,
            order: params.order,
            page: params.page,
            pageSize: params.pageSize,
          }
    );
  }

  private handleRedirect(id: string) {
    this.props.redirect(Path.RESOURCE_POOL_UPDATE.replace(':id', id));
  }
}
