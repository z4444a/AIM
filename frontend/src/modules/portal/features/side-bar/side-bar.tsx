import React, { ReactNode } from 'react';
import { Style } from './styles';
import { mapStateToProps } from './index';
import Drawer from '@material-ui/core/Drawer';
import MainMenu from '../main-menu/index';

export type InternalProps = Style & ReturnType<typeof mapStateToProps>;

export class SideBar extends React.PureComponent<InternalProps> {
  public render(): ReactNode {
    const { classes, sideNavIsOpen } = this.props;
    const stateClass = sideNavIsOpen ? classes.drawerOpen : classes.drawerClose;
    return (
      <Drawer
        className={[classes.drawer, stateClass].join(' ')}
        variant="permanent"
        classes={{
          paper: stateClass,
        }}
        open={sideNavIsOpen}
      >
        <div className={classes.toolbar} />
        <MainMenu />
      </Drawer>
    );
  }
}
