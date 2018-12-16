import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { decorate } from '../utils/component';

import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';

const styles = theme => ({
  appBar: {
    position: 'relative',
  },
  flex: {
    flex: 1,
  },
  content: {
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 2,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

class ImageDialog extends Component {
  render() {
    const { open, image, onClose, classes } = this.props;

    return (
      <Dialog open={open} onClose={onClose}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              onClick={this.props.onClose}
              aria-label="Close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" className={classes.flex}>
              Image
            </Typography>
          </Toolbar>
        </AppBar>
        <div className={classes.content}>
          <img src={image} alt="" className={classes.image} />
        </div>
      </Dialog>
    );
  }
}

ImageDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  image: PropTypes.string,
  onClose: PropTypes.func.isRequired,
};

export default decorate(styles)(ImageDialog);
