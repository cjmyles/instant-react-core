import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { decorate } from '../utils/component';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { auth } from '../utils/firebase';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Hidden from '@material-ui/core/Hidden';

const styles = theme => ({
  root: {
    zIndex: theme.zIndex.drawer + 1,
  },
  title: {
    flexGrow: 1,
    textDecoration: 'none',
  },
  logo: {
    flexGrow: 1,
    paddingTop: theme.spacing.unit,
  },
  // menuButton: {
  //   marginLeft: -12,
  //   marginRight: 20,
  // },
});

class ButtonAppBar extends Component {
  state = {
    menuAnchorEl: null,
  };

  handleOpenMenu = event => {
    this.setState({ menuAnchorEl: event.currentTarget });
  };

  handleCloseMenu = () => {
    this.setState({ menuAnchorEl: null });
  };

  handleClickSignOut = () => {
    this.setState({ menuAnchorEl: null }, () => {
      auth.signOut();
    });
  };

  render() {
    const { position, logo, title, className, classes } = this.props;
    const { menuAnchorEl } = this.state;

    return (
      <AppBar
        position={position}
        className={classNames(classes.root, className)}
      >
        <Toolbar>
          {logo ? (
            <div className={classes.logo}>
              <Link to="/">
                <img src={logo.url} alt="Logo" height={logo.height} />
              </Link>
            </div>
          ) : (
            <Typography
              component={Link}
              variant="h6"
              color="inherit"
              className={classes.title}
              to="/"
            >
              {title}
            </Typography>
          )}
          <Hidden smUp>
            <IconButton
              className={classes.menuButton}
              color="inherit"
              aria-label="Menu"
              onClick={this.props.handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
          </Hidden>
          {auth.isAuthenticated && (
            <Hidden only="xs">
              <div>
                <IconButton
                  aria-owns={Boolean(menuAnchorEl) ? 'menu-appbar' : null}
                  aria-haspopup="true"
                  onClick={this.handleOpenMenu}
                  color="inherit"
                >
                  <AccountCircleIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={menuAnchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(menuAnchorEl)}
                  onClose={this.handleCloseMenu}
                >
                  <MenuItem
                    onClick={this.handleCloseMenu}
                    component={Link}
                    to="/profile"
                  >
                    Profile
                  </MenuItem>
                  <MenuItem onClick={this.handleClickSignOut}>
                    Sign Out
                  </MenuItem>
                </Menu>
              </div>
            </Hidden>
          )}
        </Toolbar>
      </AppBar>
    );
  }
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string,
};

export default decorate(styles)(ButtonAppBar);
