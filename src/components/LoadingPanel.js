import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { decorate } from '../utils/component';

import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
  root: {
    zIndex: 999,
  },
  fullscreen: {
    position: 'fixed',
    height: '2em',
    width: '2em',
    overflow: 'show',
    margin: 'auto',
    top: '-4em',
    left: '-4em',
    bottom: 0,
    right: 0,
  },
  relative: {
    display: 'flex',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

class LoadingPanel extends Component {
  get variant() {
    return this.props.variant || 'relative';
  }

  get size() {
    const small = 25;
    const medium = 50;
    const large = 100;
    switch (this.props.size) {
      case 'small':
        return small;
      case 'medium':
        return medium;
      case 'large':
        return large;
      default:
        return large;
    }
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classNames(classes.root, classes[this.variant])}>
        <CircularProgress size={this.size} color="secondary" />
      </div>
    );
  }
}

LoadingPanel.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default decorate(styles)(LoadingPanel);
