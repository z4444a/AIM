import React from 'react';
import Breadcrumbs from '@material-ui/lab/Breadcrumbs';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import withBreadcrumbs, { BreadcrumbsRoute, InjectedProps } from 'react-router-breadcrumbs-hoc';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import createStyles from '@material-ui/core/styles/createStyles';
import Chip from '@material-ui/core/Chip';
import { emphasize } from '@material-ui/core/styles/colorManipulator';
import { Path } from '../../path';
import { Link } from 'react-router-dom';

const paths: BreadcrumbsRoute[] = [
  {
    path: '/',
    breadcrumb: null,
  },
  {
    path: Path.REQUEST_CREATE,
    breadcrumb: 'Создание заявки',
  },
  {
    path: Path.REQUESTS,
    breadcrumb: 'Заявки',
  },
  {
    path: Path.RESOURCE_TYPES,
    breadcrumb: 'Типы ресурсов',
  },
  {
    path: Path.RESOURCE_TYPE_CREATE,
    breadcrumb: 'Создание типа',
  },
  {
    path: Path.RESOURCE_TYPE_UPDATE,
    breadcrumb: 'Карточка типа',
  },
  {
    path: Path.RESOURCE_POOL_CREATE,
    breadcrumb: 'Создание',
  },
  {
    path: Path.RESOURCE_POOL_CHART,
    breadcrumb: 'График распределения типов ресурсов',
  },
  {
    path: Path.RESOURCE_POOL_UPDATE,
    breadcrumb: 'Карточка пула',
  },
  {
    path: Path.RESOURCE_POOLS,
    breadcrumb: 'Пулы ресурсов',
  },
  {
    path: Path.EMPLOYEES,
    breadcrumb: 'Cотрудники',
  },
  {
    path: Path.EMPLOYEE_CARD,
    breadcrumb: 'Карточка сотрудника',
  },
  {
    path: Path.REQUEST_CARD,
    breadcrumb: 'Одобрение заявки',
  },
  {
    path: Path.SETTINGS,
    breadcrumb: 'Настройки',
  },
];

const styles = (theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing.unit,
    },
    chip: {
      backgroundColor: theme.palette.grey[100],
      height: 24,
      color: theme.palette.grey[800],
      fontWeight: theme.typography.fontWeightRegular,
      '&:hover, &:focus': {
        backgroundColor: theme.palette.grey[300],
      },
      '&:active': {
        boxShadow: theme.shadows[1],
        backgroundColor: emphasize(theme.palette.grey[300], 0.12),
      },
    },
    link: {
      textDecoration: 'none',
    },
  });

type Styles = WithStyles<'root' | 'chip' | 'link'>;

type Props = InjectedProps & Styles;

class MuiBreadcrumbs extends React.Component<Props> {
  public render(): React.ReactNode {
    const { breadcrumbs, classes } = this.props;
    const breadcrumbsLen = breadcrumbs.length;
    return (
      <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />}>
        {breadcrumbs.map((breadcrumb, i) =>
          breadcrumbsLen === i + 1 ? (
            <Chip
              key={breadcrumb.match.path}
              label={breadcrumb.breadcrumb}
              className={classes.chip}
            />
          ) : (
            <Link key={breadcrumb.match.path} to={breadcrumb.match.path} className={classes.link}>
              <Chip
                key={breadcrumb.match.path}
                label={breadcrumb.breadcrumb}
                className={classes.chip}
              />
            </Link>
          )
        )}
      </Breadcrumbs>
    );
  }
}

export default withBreadcrumbs(paths)(withStyles(styles)(MuiBreadcrumbs));
