import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { decorate } from '../utils/component';
import { auth } from 'instant-react-core/utils/firebase';

import AppBar from '../components/AppBar';
import Sidebar from '../components/Sidebar';

import DashboardIcon from '@material-ui/icons/Dashboard';
import HelpIcon from '@material-ui/icons/HelpOutline';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import PowerIcon from '@material-ui/icons/PowerSettingsNew';

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

const defaultUnauthenticatedLinks = [
  { label: 'About', to: '/about', icon: HelpIcon },
];
const defaultAuthenticatedLinks = [
  { label: 'Dashboard', to: '/', icon: DashboardIcon },
  { label: 'About', to: '/about', icon: HelpIcon },
  { label: 'Profile', to: '/profile', icon: AccountBoxIcon },
  {
    label: 'Sign Out',
    icon: PowerIcon,
    action: () => {
      auth.signOut();
    },
  },
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
      unauthenticatedLinks,
      authenticatedLinks,
      mobileUnauthenticatedLinks,
      mobileAuthenticatedLinks,
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
          authenticatedLinks={authenticatedLinks || defaultAuthenticatedLinks}
          unauthenticatedLinks={
            unauthenticatedLinks || defaultUnauthenticatedLinks
          }
          mobileAuthenticatedLinks={
            mobileAuthenticatedLinks || defaultAuthenticatedLinks
          }
          mobileUnauthenticatedLinks={
            mobileUnauthenticatedLinks || defaultUnauthenticatedLinks
          }
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
  authenticatedLinks: PropTypes.array,
  unauthenticatedLinks: PropTypes.array,
  mobileAuthenticatedLinks: PropTypes.array,
  mobileUnauthenticatedLinks: PropTypes.array,
};

export default decorate(styles)(DashboardLayout);
