import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { decorate } from '../utils/component';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { auth } from '../utils/firebase';

import Hidden from '@material-ui/core/Hidden';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Icon from '@material-ui/core/Icon';
import Divider from '@material-ui/core/Divider';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import PowerIcon from '@material-ui/icons/PowerSettingsNew';

const drawerWidth = 240;

const styles = theme => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  toolbar: theme.mixins.toolbar,
  listItem: {
    '&.active': {
      backgroundColor: theme.palette.grey[200],
    },
  },
});

class SideBar extends Component {
  handleClickSignOut = () => {
    auth.signOut();
  };

  renderLinks(links) {
    // Note: The `NavLink` component erroneously adds the `active` class to more than one element, so we use `Link` instead and manually set the `active` class
    const { classes } = this.props;

    return (
      <List>
        {links.map((link, index) => (
          <ListItem
            key={index}
            button
            component={Link}
            to={link.to}
            className={classNames(
              classes.listItem,
              link.to === this.props.match.path ? 'active' : ''
            )}
          >
            <ListItemIcon>
              {typeof link.icon === 'string' ? (
                <Icon>{link.icon}</Icon>
              ) : (
                <link.icon />
              )}
            </ListItemIcon>
            <ListItemText primary={link.label} />
          </ListItem>
        ))}
      </List>
    );
  }

  renderAuthOptions() {
    const { classes } = this.props;

    return (
      <List>
        <ListItem
          button
          component={Link}
          to="/profile"
          className={classes.listItem}
        >
          <ListItemIcon>
            <AccountBoxIcon />
          </ListItemIcon>
          <ListItemText primary="Profile" />
        </ListItem>

        <ListItem
          button
          className={classes.listItem}
          onClick={this.handleClickSignOut}
        >
          <ListItemIcon>
            <PowerIcon />
          </ListItemIcon>
          <ListItemText primary="Sign Out" />
        </ListItem>
      </List>
    );
  }

  render() {
    const { variant, links, mobileLinks, open, classes } = this.props;

    return (
      <Fragment>
        {/* Permanent Drawer */}
        {variant === 'permanent' && (
          <Hidden only="xs" implementation="css">
            <Drawer
              anchor="left"
              variant="permanent"
              open
              classes={{
                paper: classes.drawerPaper,
              }}
              className={classes.drawer}
            >
              <div className={classes.sidebarWrapper}>
                <div className={classes.toolbar} />
                {this.renderLinks(links)}
              </div>
            </Drawer>
          </Hidden>
        )}

        {/* Mobile Drawer */}
        <Hidden smUp implementation="css">
          <Drawer
            variant="temporary"
            anchor="right"
            open={open}
            onClose={this.props.handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            <div className={classes.sidebarWrapper}>
              {this.renderLinks(mobileLinks)}
              {auth.isAuthenticated && (
                <Fragment>
                  <Divider />
                  {this.renderAuthOptions()}
                </Fragment>
              )}
            </div>
          </Drawer>
        </Hidden>
      </Fragment>
    );
  }
}

SideBar.propTypes = {
  classes: PropTypes.object.isRequired,
  variant: PropTypes.string,
  links: PropTypes.array,
  mobileLinks: PropTypes.array,
};

export default decorate(styles, { withRouter: true })(SideBar);
