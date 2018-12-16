import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { decorate } from '../utils/component';

import AppBar from '../components/AppBar';
import Sidebar from '../components/Sidebar';

import DashboardIcon from '@material-ui/icons/Dashboard';
import SettingsIcon from '@material-ui/icons/Settings';
import HelpIcon from '@material-ui/icons/HelpOutline';

const styles = theme => ({
  root: {
    flexGrow: 1,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
  },
  appBar: {},
  sidebar: {},
  main: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    height: '100vh',
    overflow: 'auto',
    minWidth: 0, // So the Typography noWrap works
  },
  toolbar: theme.mixins.toolbar,
});

const defaultSidebarLinks = [
  { label: 'Dashboard', to: '/', icon: DashboardIcon },
  { label: 'Settings', to: '/settings', icon: SettingsIcon },
  { label: 'About', to: '/about', icon: HelpIcon },
];

class DashboardLayout extends Component {
  state = {
    isMobileOpen: false,
  };

  handleDrawerToggle = event => {
    this.setState(prevState => ({
      isMobileOpen: !prevState.isMobileOpen,
    }));
  };

  render() {
    const {
      variant = 'default', // "dashboard"
      showAppBar = true,
      appBarLogo,
      appBarTitle,
      sidebarLinks,
      mobileLinks,
      classes,
    } = this.props;
    const { isMobileOpen } = this.state;

    return (
      <div className={classes.root}>
        {showAppBar && (
          <AppBar
            position="fixed"
            logo={appBarLogo}
            title={appBarTitle}
            handleDrawerToggle={this.handleDrawerToggle}
            className={classes.appBar}
          />
        )}

        <Sidebar
          variant={variant === 'default' ? 'mobile' : 'permanent'}
          links={sidebarLinks || defaultSidebarLinks}
          mobileLinks={mobileLinks || defaultSidebarLinks}
          handleDrawerToggle={this.handleDrawerToggle}
          open={isMobileOpen}
        />
        <main className={classes.main}>
          <div className={classes.toolbar} />
          {this.props.children}
        </main>
      </div>
    );
  }
}

DashboardLayout.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default decorate(styles)(DashboardLayout);
