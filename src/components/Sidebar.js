import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { decorate } from '../utils/component';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import Hidden from '@material-ui/core/Hidden';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Icon from '@material-ui/core/Icon';

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
  renderLinks(links) {
    // Note: The `NavLink` component erroneously adds the `active` class to more than one element, so we use `Link` instead and manually set the `active` class
    const { classes } = this.props;

    return (
      <List>
        {links.map((link, index) => (
          <ListItem
            key={index}
            button
            component={link.to ? Link : null}
            to={link.to || null}
            onClick={link.action || null}
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

  render() {
    const {
      variant,
      authenticatedLinks,
      unauthenticatedLinks,
      mobileAuthenticatedLinks,
      mobileUnauthenticatedLinks,
      open,
      classes,
    } = this.props;

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

                {this.props.auth.isAuthenticated
                  ? this.renderLinks(authenticatedLinks)
                  : this.renderLinks(unauthenticatedLinks)}
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
              {this.props.auth.isAuthenticated
                ? this.renderLinks(mobileAuthenticatedLinks)
                : this.renderLinks(mobileUnauthenticatedLinks)}
            </div>
          </Drawer>
        </Hidden>
      </Fragment>
    );
  }
}

SideBar.propTypes = {
  classes: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  variant: PropTypes.string,
  authenticatedLinks: PropTypes.array.isRequired,
  unauthenticatedLinks: PropTypes.array.isRequired,
  mobileAuthenticatedLinks: PropTypes.array.isRequired,
  mobileUnauthenticatedLinks: PropTypes.array.isRequired,
};

export default decorate(styles, 'auth', { withRouter: true })(SideBar);
