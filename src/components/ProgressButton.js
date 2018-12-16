import React from 'react';
import PropTypes from 'prop-types';
import { decorate } from '../utils/component';
import classNames from 'classnames';

import Fab from '@material-ui/core/Fab';
import CircularProgress from '@material-ui/core/CircularProgress';
import green from '@material-ui/core/colors/green';
import Button from '@material-ui/core/Button';
import CheckIcon from '@material-ui/icons/Check';
import SaveIcon from '@material-ui/icons/Save';

const styles = theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  wrapper: {
    margin: theme.spacing.unit,
    position: 'relative',
  },
  buttonSuccess: {
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700],
    },
  },
  fabProgress: {
    color: green[500],
    position: 'absolute',
    top: -6,
    left: -6,
    zIndex: 1,
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
});

class ProgressButton extends React.Component {
  render() {
    const {
      variant,
      label = '',
      loading,
      success,
      disabled,
      classes,
    } = this.props;
    const buttonClassname = classNames({
      [classes.buttonSuccess]: success,
    });

    return (
      <div className={classes.root}>
        <div className={classes.wrapper}>
          {variant === 'fab' ? (
            <Fab
              color="primary"
              className={buttonClassname}
              disabled={disabled}
              onClick={this.props.onClick}
            >
              {success ? <CheckIcon /> : <SaveIcon />}
            </Fab>
          ) : (
            <Button
              variant="contained"
              color="primary"
              className={buttonClassname}
              disabled={disabled}
              onClick={this.props.onClick}
            >
              {label}
            </Button>
          )}
          {loading && (
            <CircularProgress
              size={variant === 'fab' ? 68 : 24}
              className={
                variant === 'fab' ? classes.fabProgress : classes.buttonProgress
              }
            />
          )}
        </div>
      </div>
    );
  }
}

ProgressButton.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default decorate(styles)(ProgressButton);
