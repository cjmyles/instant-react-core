import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { decorate } from '../utils/component';
import SignatureCanvas from 'react-signature-canvas';
import moment from 'moment';

import Button from '@material-ui/core/Button';

const styles = theme => ({
  root: {},
  canvas: {
    border: `3px dashed ${theme.palette.secondary.main}`,
    backgroundColor: theme.palette.common.white,
    width: '100%',
    height: 300,
    marginBottom: theme.spacing.unit,
  },
  imageContainer: {
    border: `3px dashed ${theme.palette.secondary.main}`,
    backgroundColor: theme.palette.common.white,
    width: '100%',
    height: 300,
    marginBottom: theme.spacing.unit + 4,
  },
  image: {
    maxHeight: '100%',
    maxWidth: '100%',
  },
  button: {
    margin: theme.spacing.unit,
  },
});

class Signature extends Component {
  state = {
    signature: this.props.signature,
    pristine: !this.props.signature,
  };

  handleBegin = () => {
    this.setState({ pristine: false });
  };

  handleClear = () => {
    this.setState({ pristine: true, signature: null });
    if (this.signatureCanvas) {
      this.signatureCanvas.clear();
    }
    if (this.props.onChange) {
      this.props.onChange(null);
    }
  };

  handleAccept = () => {
    if (this.signatureCanvas) {
      const { stamp } = this.props;
      // Add meta data to the signature
      const canvas = this.signatureCanvas.getCanvas();
      const ctx = canvas.getContext('2d');
      ctx.font = '12px "Roboto", "Helvetica", "Arial", sans-serif';
      ctx.fillStyle = '#000000';
      // Add a label
      if (stamp) {
        ctx.fillText(stamp, 10, 270);
      }
      ctx.fillText(new moment().format('DD/MM/YY HH:mm'), 10, 290);
      // Create a static copy
      const signature = canvas.toDataURL('image/png');
      this.setState({
        signature,
      });
      if (this.props.onChange) {
        this.props.onChange(signature);
      }
    }
  };

  render() {
    const { readonly, classes } = this.props;
    const { pristine, signature } = this.state;

    return (
      <Fragment>
        {signature ? (
          <div className={classes.imageContainer}>
            <img src={signature} alt="" className={classes.image} />
          </div>
        ) : (
          <SignatureCanvas
            penColor="blue"
            canvasProps={{
              className: classes.canvas,
            }}
            backgroundColor="#FFFFFF"
            ref={ref => {
              this.signatureCanvas = ref;
            }}
            onBegin={this.handleBegin}
          />
        )}

        {!readonly && (
          <Fragment>
            <Button
              variant="contained"
              color="secondary"
              className={classes.button}
              onClick={this.handleClear}
              disabled={pristine}
            >
              Clear
            </Button>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={this.handleAccept}
              disabled={pristine || !!signature}
            >
              Accept
            </Button>
          </Fragment>
        )}
      </Fragment>
    );
  }
}

Signature.propTypes = {
  classes: PropTypes.object.isRequired,
  signature: PropTypes.string,
  readonly: PropTypes.bool,
};

export default decorate(styles)(Signature);
