import React from 'react';
import { Path } from '../../../../commons/path';
import {
  FilterValueType,
  Props as DataGridProps,
} from '../../../../commons/components/aim-data-grid/aim-data-grid';
import AimDataGrid from '../../../../commons/components/aim-data-grid';
import { SortOrder } from '../../../resource-pool/SortOrder';
import { MUIDataTableColumn, MUIDataTableColumnOptions } from 'mui-datatables';
import { WithTranslation } from 'react-i18next';
import { mapDispatchToProps, mapStateToProps } from './index';
import ResourceTypeModel from '../../../../model/get/resource-type-model';
import { ResourceTypesParams } from '../../../../model/parameters/resource-types-parameters';
import ResourceTypeFilterPanel from '../../components/resource-type-filter-panel/index';
import { FilterField } from '../../components/resource-type-filter-panel/resource-type-filter-panel';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import AddCircle from '@material-ui/icons/AddCircle';
import { ParameterGetModel } from '../../../../model/get/parameters-get-model';
import { Style } from './styles';
import { ParameterModifier } from '../../../../model/parameter-modifier';
import Edit from '@material-ui/icons/Edit';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { RequestStatus } from '../../../../model/get/request-status';
import { RequestParams } from '../../../../model/parameters/request-params';

//dont call any items except rowData[0]
interface ResourceTypesPageTableMeta {
  columnData: MUIDataTableColumnOptions[];
  rowData: number[];
}
export type Props = ReturnType<typeof mapDispatchToProps> &
  ReturnType<typeof mapStateToProps> &
  WithTranslation &
  Style;

export interface State {
  redirectPath?: string;
}
export class ResourceTypesPage extends React.Component<Props, State> {
  private readonly colDefs: MUIDataTableColumn[];
  private readonly gridConfig: Partial<DataGridProps>;

  public constructor(props: Props) {
    super(props);
    this.state = {};
    this.gridConfig = this.getGridConfig();
    this.colDefs = this.getGridColumnsConfig();
  }

  public componentDidMount(): void {
    this.props.fetch(this.props.params);
  }

  public componentWillReceiveProps(nextProps: Readonly<Props>): void {
    const { redirectPath } = this.state;
    if (nextProps.requestParams !== this.props.requestParams && redirectPath) {
      this.props.redirect(redirectPath);
    }
  }

  public render(): JSX.Element {
    const { datasource, params, showFilterPanel } = this.props;
    const sort = {
      sortBy: params.sortBy as string,
      direction: params.order,
    };

    if (!datasource) {
      return <div />;
    }
    const filter: { [key: string]: FilterValueType } = {};
    if (params.name) {
      filter[FilterField.RESOURCE_TYPE_NAME] = params.name;
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
      pageTitle: t('resourceTypePage.header'),
      onColumnSortChange: (changedColumn, direction) =>
        this.handleColumnSortChange(changedColumn, direction),
      onChangePage: currentPage => this.handleChangePage(currentPage),
      onChangeRowsPerPage: numberOfRows => this.handleChangeRowsPerPage(numberOfRows),
      renderCustomFilterCmp: context => <ResourceTypeFilterPanel context={context} />,
      onFilterChange: this.handleFilterChange,
      toggleFilterPanel: this.toggleShowFilterPanel,
      customToolbar: () => {
        return (
          <Tooltip title={t('resourceTypesPage.buttons.new')}>
            <IconButton onClick={() => this.props.redirect(Path.RESOURCE_TYPE_CREATE)}>
              <AddCircle />
            </IconButton>
          </Tooltip>
        );
      },
    };

    return gridConfig;
  }

  private toggleShowFilterPanel = (showFilterPanel: boolean) => {
    const { toggleFilterPanel } = this.props;
    toggleFilterPanel(showFilterPanel);
  };

  private getGridColumnsConfig(): MUIDataTableColumn[] {
    const { t } = this.props;
    const colDefs: MUIDataTableColumn[] = [
      {
        label: t('resourceTypePage.grid.columns.id'),
        name: 'id',
      },
      {
        label: t('resourceTypePage.grid.columns.name'),
        name: 'name',
      },
      {
        label: t('resourceTypePage.grid.columns.description'),
        name: 'description',
      },
      {
        label: t('resourceTypePage.grid.columns.pools'),
        name: 'numberOfPools',
      },
      {
        label: t('resourceTypePage.grid.columns.requests'),
        name: 'numberOfRequests',
        options: {
          sort: false,
          customBodyRender: (numberOfRequests: number[], metaData: ResourceTypesPageTableMeta) =>
            this.customRequestNumberRender(numberOfRequests, metaData),
        },
      },
      {
        label: t('resourceTypePage.grid.columns.poolParameters'),
        name: 'parameters',
        options: {
          sort: false,
          customBodyRender: (parameters: ParameterGetModel[]) =>
            this.customParameterRender(ParameterModifier.POOL_PARAMETER, parameters),
        },
      },
      {
        label: t('resourceTypePage.grid.columns.requestParameters'),
        name: 'parameters',
        options: {
          sort: false,
          customBodyRender: (parameters: ParameterGetModel[]) =>
            this.customParameterRender(ParameterModifier.REQUEST_PARAMETER, parameters),
        },
      },
      {
        label: t('resourceTypePage.grid.columns.allocationParameters'),
        name: 'parameters',
        options: {
          sort: false,
          customBodyRender: (parameters: ParameterGetModel[]) =>
            this.customParameterRender(ParameterModifier.ALLOCATION_PARAMETER, parameters),
        },
      },
      {
        label: ' ',
        name: 'id',
        options: {
          customBodyRender: (id: number) => {
            return (
              <Tooltip title={t('resourceTypesPage.tooltips.edit')}>
                <IconButton onClick={() => this.handleRedirect(id)}>
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

  private customRequestNumberRender = (
    counter: number[],
    metaData: ResourceTypesPageTableMeta
  ): React.ReactNode => {
    if (metaData.columnData.length === 0) {
      return <div />;
    }
    const typeName: number = metaData.rowData[0];
    const linkToRequests = (status: RequestStatus) =>
      this.renderLinkToRequestsPage(counter, typeName, status);
    return (
      <Typography>
        {linkToRequests(RequestStatus.NEW)}/{linkToRequests(RequestStatus.IN_PROGRESS)}/
        {linkToRequests(RequestStatus.PROCESSED)}/{linkToRequests(RequestStatus.CANCELED)}
      </Typography>
    );
  };
  private renderLinkToRequestsPage = (
    counter: number[],
    typeName: number,
    statusId: RequestStatus
  ): React.ReactNode => {
    const content: number = counter[statusId - 1];
    const { t, setRedirectFilter, classes } = this.props;
    const filterParam: RequestParams = {
      typeName,
      statusId,
      pageSize: content < 10 ? content : 10,
    };
    const state = { redirectPath: Path.REQUESTS };
    let statusName = '';
    switch (statusId) {
      case RequestStatus.NEW:
        statusName = 'new';
        break;
      case RequestStatus.IN_PROGRESS:
        statusName = 'inProgress';
        break;
      case RequestStatus.PROCESSED:
        statusName = 'processed';
        break;
      case RequestStatus.CANCELED:
        statusName = 'canceled';
        break;
    }
    return (
      <Tooltip title={t(`resourceTypePage.tooltips.requests.${statusName}`)}>
        <Link
          style={{ color: 'black' }}
          className={content !== 0 ? classes.linkCursor : ''}
          onClick={() =>
            content !== 0 ? this.setState(state, () => setRedirectFilter(filterParam)) : {}
          }
        >
          {content}
        </Link>
      </Tooltip>
    );
  };
  private customParameterRender = (
    modifier: ParameterModifier,
    parameters: ParameterGetModel[]
  ): React.ReactNode => {
    const { classes, t } = this.props;
    if (!parameters || parameters.length === 0) {
      return '';
    }
    return (
      <div className={parameters.length > 3 ? classes.scroll : undefined}>
        {parameters
          .filter(param => param.modifier === modifier)
          .map((item, index) => (
            <p key={index}>
              <b>{item.name}</b>: {t(`parameterType.${item.parameterType.toLocaleLowerCase()}`)}
            </p>
          ))}
      </div>
    );
  };
  private handleColumnSortChange(changedColumn: string, direction: SortOrder) {
    const changeParams: Partial<ResourceTypesParams> = {
      sortBy: changedColumn as keyof ResourceTypeModel,
      order: direction,
    };
    this.handleChange(changeParams);
  }

  private handleChangePage(currentPage: number) {
    const changeParams: Partial<ResourceTypesParams> = {
      page: currentPage,
    };
    this.handleChange(changeParams);
  }

  private handleChangeRowsPerPage(numberOfRows: number) {
    const changeParams: Partial<ResourceTypesParams> = {
      pageSize: numberOfRows,
    };
    this.handleChange(changeParams);
  }

  private handleFilterChange = (values: { [key: string]: FilterValueType }) => {
    const changeParams: Partial<ResourceTypesParams> = {
      name: values[FilterField.RESOURCE_TYPE_NAME]
        ? values[FilterField.RESOURCE_TYPE_NAME] + ''
        : undefined,
    };
    this.handleChange(changeParams);
  };

  private handleChange(changeParams?: Partial<ResourceTypesParams>): void {
    const params: ResourceTypesParams = Object.assign({}, this.props.params, changeParams);

    this.props.fetch(params);
  }

  private handleRedirect(id: number) {
    this.props.redirect(Path.RESOURCE_TYPE_UPDATE.replace(':id', id.toString()));
  }
}
