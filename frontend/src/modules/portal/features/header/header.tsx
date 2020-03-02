import React, { ReactNode } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { mapDispatchToProps, mapStateToProps } from './index';
import { Style } from './styles';

export type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> &
  Style;

export class Header extends React.PureComponent<Props> {
  public render(): ReactNode {
    const { classes, name, logout, toggleSideNav } = this.props;

    return (
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="Open drawer"
            onClick={toggleSideNav}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          {this.props.children}
          <div className={classes.emptySpace} />
          <h4>{name}</h4>
          <IconButton onClick={logout}>
            <ExitToAppIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    );
  }
}
