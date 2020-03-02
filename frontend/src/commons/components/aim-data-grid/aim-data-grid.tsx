import React, { ReactNode } from 'react';
import MUIDataTable, {
  MUIDataTableColumn,
  MUIDataTableColumnDef,
  MUIDataTableTextLabels,
} from 'mui-datatables';
import { SortOrder } from '../../../modules/resource-pool/SortOrder';
import { Order } from '../../../modules/resource-pool/Order';
import { WithTranslation } from 'react-i18next';
import FilterList from '@material-ui/icons/FilterList';
import { Paper } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import { Style } from './styles';
import Tooltip from '@material-ui/core/Tooltip';
import AimDataGridFilterPanel from '../aim-data-grid-filter-panel/index';
import { GenericFormValue } from '../generic-fields/models/field-config.model';

export type FilterValueType =
  | string
  | number
  | string[]
  | number[]
  | undefined
  | null
  | boolean
  | GenericFormValue
  | GenericFormValue[];

export interface CustomFilterCmpContext {
  changeFilters: (values: { [key: string]: FilterValueType }) => void;
  values?: { [key: string]: FilterValueType };
  applyFilters?: () => void;
}

export interface Props {
  columns: MUIDataTableColumn[];
  data: (object | number[] | string[])[];
  totalPageCount: number;
  sort?: {
    sortBy: string;
    direction: SortOrder;
  };
  pageTitle?: string;
  serverSide?: boolean;
  rowsPerPage?: number;
  rowsPerPageOptions?: number[];
  customToolbar?: () => ReactNode;
  onColumnSortChange?: (changedColumn: string, direction: SortOrder) => void;
  onChangePage?: (currentPage: number) => void;
  onChangeRowsPerPage?: (numberOfRows: number) => void;
  onRowClick?: (
    rowData: string[],
    rowMeta: { dataIndex: number; rowIndex: number },
    dataItem: object
  ) => void;
  onFilterChange?: (
    values: { [key: string]: FilterValueType },
    clear: boolean /*| undefined = undefined*/
  ) => void;
  renderCustomFilterCmp?: (context: CustomFilterCmpContext) => ReactNode;
  filterValues?: { [key: string]: FilterValueType };
  filterPanelOpen?: boolean;
  toggleFilterPanel?: (show: boolean) => void;
}

export type InternalProps = Props & WithTranslation & Style;

export class AimDataGrid extends React.PureComponent<InternalProps> {
  public static defaultProps = {
    rowsPerPageOptions: [10, 50, 100],
    rowsPerPage: 50,
    serverSide: true,
  };

  private readonly textLabels: MUIDataTableTextLabels;

  public constructor(props: InternalProps) {
    super(props);
    this.textLabels = this.initTextLabels();
  }

  public render(): ReactNode {
    const {
      data,
      totalPageCount,
      rowsPerPageOptions,
      rowsPerPage,
      serverSide,
      pageTitle,
      classes,
      filterPanelOpen,
    } = this.props;
    const filterPanelStyle = filterPanelOpen ? classes.filterPanelOpen : classes.filterPanelHidden;
    const columns = this.preProcessColDefs();
    return (
      <Paper className={classes.paperContainer}>
        <div className={classes.innerContainer}>
          <div className={classes.gridContainer}>
            <MUIDataTable
              title={pageTitle}
              data={data}
              columns={columns}
              options={{
                textLabels: this.textLabels,
                serverSide,
                filterType: 'textField',
                onRowClick: this.handleRowClick,
                count: totalPageCount,
                selectableRows: false,
                rowsPerPageOptions,
                rowsPerPage,
                responsive: 'scroll',
                filter: false,
                search: false,
                customToolbar: this.renderCustomToolbar,
                onColumnSortChange: this.handleColumnSortChange,
                onChangePage: this.handleChangePage,
                onChangeRowsPerPage: this.handleChangeRowsPerPage,
              }}
            />
          </div>
          <div
            className={`${classes.filterContainer} ${filterPanelStyle} ${classes.filterPanelTransition}`}
          >
            {this.renderFilterPanel()}
          </div>
        </div>
      </Paper>
    );
  }

  private renderFilterPanel(): ReactNode {
    const { renderCustomFilterCmp, filterValues, filterPanelOpen } = this.props;
    const dialog = (
      <AimDataGridFilterPanel
        open={filterPanelOpen}
        filterValues={filterValues}
        onClearFilters={this.handleClearFilters}
        renderCustomFilterCmp={renderCustomFilterCmp}
        onApplyFilters={this.handleApplyFilterValues}
      />
    );
    return dialog;
  }

  private renderCustomToolbar = () => {
    const { customToolbar, t, filterPanelOpen } = this.props;
    const title = filterPanelOpen
      ? t('aimDataGrid.toolbar.hideFilter')
      : t('aimDataGrid.toolbar.showFilter');
    const toolbar = (
      <React.Fragment>
        <Tooltip title={title}>
          <IconButton onClick={this.toggleFilterDialog}>
            <FilterList />
          </IconButton>
        </Tooltip>
        {customToolbar && customToolbar()}
      </React.Fragment>
    );
    return toolbar;
  };

  private toggleFilterDialog = () => {
    const { filterPanelOpen, toggleFilterPanel } = this.props;
    if (toggleFilterPanel && typeof toggleFilterPanel === 'function') {
      toggleFilterPanel(!filterPanelOpen);
    }
  };

  private handleClearFilters = () => {
    const { onFilterChange } = this.props;
    if (onFilterChange && typeof onFilterChange === 'function') {
      onFilterChange({}, true);
    }
  };

  private handleApplyFilterValues = (filterValues: { [key: string]: FilterValueType }) => {
    const { onFilterChange } = this.props;
    if (onFilterChange && typeof onFilterChange === 'function') {
      onFilterChange(filterValues, false);
    }
  };

  private initTextLabels(): MUIDataTableTextLabels {
    const { t } = this.props;
    const config: MUIDataTableTextLabels = {
      body: {
        noMatch: t('aimDataGrid.body.noMatch'),
        toolTip: t('aimDataGrid.body.toolTip'),
      },
      pagination: {
        next: t('aimDataGrid.pagination.next'),
        previous: t('aimDataGrid.pagination.previous'),
        rowsPerPage: t('aimDataGrid.pagination.rowsPerPage'),
        displayRows: t('aimDataGrid.pagination.displayRows'),
      },
      toolbar: {
        search: t('aimDataGrid.toolbar.search'),
        downloadCsv: t('aimDataGrid.toolbar.downloadCsv'),
        print: t('aimDataGrid.toolbar.print'),
        viewColumns: t('aimDataGrid.toolbar.viewColumns'),
        filterTable: t('aimDataGrid.toolbar.filterTable'),
      },
      filter: {
        all: t('aimDataGrid.filter.all'),
        title: t('aimDataGrid.filter.title'),
        reset: t('aimDataGrid.filter.reset'),
      },
      viewColumns: {
        title: t('aimDataGrid.viewColumns.title'),
        titleAria: t('aimDataGrid.viewColumns.titleAria'),
      },
      selectedRows: {
        text: t('aimDataGrid.selectedRows.text'),
        delete: t('aimDataGrid.selectedRows.delete'),
        deleteAria: t('aimDataGrid.selectedRows.deleteAria'),
      },
    };
    return config;
  }

  private handleColumnSortChange = (changedColumn: string, direction: string) => {
    const { onColumnSortChange } = this.props;
    if (typeof onColumnSortChange === 'function') {
      const sortOrder: SortOrder =
        direction === 'ascending' ? Order.ASC : direction === 'descending' ? Order.DESC : undefined;
      onColumnSortChange(changedColumn, sortOrder);
    }
  };
  private handleChangePage = (currentPage: number) => {
    const { onChangePage } = this.props;
    if (typeof onChangePage === 'function') {
      onChangePage(currentPage);
    }
  };
  private handleChangeRowsPerPage = (numberOfRows: number) => {
    const { onChangeRowsPerPage } = this.props;
    if (typeof onChangeRowsPerPage === 'function') {
      onChangeRowsPerPage(numberOfRows);
    }
  };
  private handleRowClick = (
    rowData: string[],
    rowMeta: { dataIndex: number; rowIndex: number }
  ) => {
    const { onRowClick, data } = this.props;
    if (typeof onRowClick === 'function') {
      const dataItem = data[rowMeta.dataIndex];
      onRowClick(rowData, rowMeta, dataItem);
    }
  };

  private preProcessColDefs(): MUIDataTableColumnDef[] {
    const { columns } = this.props;
    if (!columns || columns.length === 0) {
      return [];
    }
    const processedColumns = columns.map(column =>
      this.preProcessColDef(column as MUIDataTableColumn)
    );
    return processedColumns;
  }

  private preProcessColDef(column: MUIDataTableColumn): MUIDataTableColumnDef {
    const { sort } = this.props;
    const processedColumn: MUIDataTableColumn = column;
    processedColumn.options = Object.assign({}, processedColumn.options);
    if (sort && processedColumn.name === sort.sortBy) {
      const sortDirection = sort.direction ? sort.direction : Order.ASC;
      processedColumn.options.sortDirection = sortDirection.toString() as 'asc' | 'desc';
    }

    return processedColumn;
  }
}
