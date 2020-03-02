import React, { ReactNode } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { mapDispatchToProps, mapStateToProps } from './index';
import MessageTwoTone from '@material-ui/icons/MessageTwoTone';
import People from '@material-ui/icons/People';
import Settings from '@material-ui/icons/Settings';
import TableChart from '@material-ui/icons/TableChart';
import Work from '@material-ui/icons/Work';
import { Path } from '../../../../commons/path';
import { WithTranslation } from 'react-i18next';
import { Role } from '../../../../commons/role';

export type InternalProps = ReturnType<typeof mapDispatchToProps> &
  ReturnType<typeof mapStateToProps> &
  WithTranslation;

export interface State {
  menuItems: MenuItem[];
}

interface MenuItem {
  key: string;
  text: string;
  icon: JSX.Element;
  path: string;
  allowedRoles: Role[];
}

export class MainMenu extends React.PureComponent<InternalProps, State> {
  public constructor(props: InternalProps) {
    super(props);
    this.state = {
      menuItems: this.getMenuItems(),
    };
  }

  public render(): ReactNode {
    const { user } = this.props;
    const role = user ? user.role : Role.USER;
    const { menuItems } = this.state;
    return (
      <List>
        {menuItems
          .filter(item => item.allowedRoles.indexOf(role) >= 0 || role === Role.ADMIN)
          .map(item => this.renderMenuItem(item))}
      </List>
    );
  }

  private renderMenuItem(menuItem: MenuItem): ReactNode {
    return (
      <ListItem
        id={menuItem.key}
        button
        key={menuItem.key}
        onClick={this.handleNavClick(menuItem.path)}
      >
        <ListItemIcon>{menuItem.icon}</ListItemIcon>
        <ListItemText primary={menuItem.text} />
      </ListItem>
    );
  }

  private handleNavClick = (path: string) => () => {
    this.props.redirect(path);
  };

  private getMenuItems(): MenuItem[] {
    const { t } = this.props;
    return [
      {
        key: 'mainMenuItemRequests',
        text: t('mainMenu.requests'),
        icon: <MessageTwoTone />,
        path: Path.REQUESTS,
        allowedRoles: [Role.USER, Role.POOL_OWNER, Role.POOL_CREATOR, Role.ADMIN],
      },
      {
        key: 'mainMenuItemResourceTypes',
        text: t('mainMenu.resourceTypes'),
        icon: <Work />,
        path: Path.RESOURCE_TYPES,
        allowedRoles: [Role.ADMIN],
      },
      {
        key: 'mainMenuItemResourcePools',
        text: t('mainMenu.resourcePools'),
        icon: <TableChart />,
        path: Path.RESOURCE_POOLS,
        allowedRoles: [Role.POOL_OWNER, Role.POOL_CREATOR],
      },
      {
        key: 'mainMenuItemEmployees',
        text: t('mainMenu.employees'),
        icon: <People />,
        path: Path.EMPLOYEES,
        allowedRoles: [Role.ADMIN],
      },
      {
        key: 'mainMenuItemSettings',
        text: t('mainMenu.settings'),
        icon: <Settings />,
        path: Path.SETTINGS,
        allowedRoles: [Role.ADMIN],
      },
    ];
  }
}
