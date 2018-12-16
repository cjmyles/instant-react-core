import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { decorate } from '../utils/component';
import classNames from 'classnames';

import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import green from '@material-ui/core/colors/green';
import amber from '@material-ui/core/colors/amber';
import IconButton from '@material-ui/core/IconButton';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import WarningIcon from '@material-ui/icons/Warning';
// import Button from '@material-ui/core/Button';

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
};

const styles = theme => ({
  root: {
    flexWrap: 'nowrap',
  },
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  info: {
    backgroundColor: theme.palette.primary.dark,
  },
  warning: {
    backgroundColor: amber[700],
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing.unit,
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
  fullWidth: {
    maxWidth: '100%',
  },
  gutterBottom: {
    marginBottom: theme.spacing.unit * 2,
  },
});

class Alert extends Component {
  render() {
    const {
      classes,
      className,
      message,
      onClose,
      variant,
      fullWidth,
      gutterBottom,
      ...rest
    } = this.props;

    const Icon = variantIcon[variant];

    return (
      <SnackbarContent
        className={classNames(
          classes.root,
          classes[variant],
          className,
          fullWidth ? classes.fullWidth : null,
          gutterBottom ? classes.gutterBottom : null
        )}
        aria-describedby="client-snackbar"
        message={
          <span id="client-snackbar" className={classes.message}>
            <Icon className={classNames(classes.icon, classes.iconVariant)} />
            {message}
          </span>
        }
        action={
          onClose
            ? [
                <IconButton
                  key="close"
                  aria-label="Close"
                  color="inherit"
                  className={classes.close}
                  onClick={onClose}
                >
                  <CloseIcon className={classes.icon} />
                </IconButton>,
              ]
            : null
        }
        {...rest}
      />
    );
  }
}

Alert.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  message: PropTypes.node,
  onClose: PropTypes.func,
  variant: PropTypes.oneOf(['success', 'warning', 'error', 'info']).isRequired,
  fullWidth: PropTypes.bool,
  gutterBottom: PropTypes.bool,
};

export default decorate(styles)(Alert);
