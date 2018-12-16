import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { decorate } from '../utils/component';
import Img from 'react-image';
import classNames from 'classnames';

import CircularProgress from '@material-ui/core/CircularProgress';
import ImageIcon from '@material-ui/icons/Image';
import grey from '@material-ui/core/colors/grey';

const styles = theme => ({
  root: {
    height: 125,
    width: 125,
    overflow: 'hidden',
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imagePlaceholder: {
    height: 165,
    width: 165,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: grey[200],
    cursor: 'pointer',
  },
  image: {
    height: 135,
    width: 135,
    objectFit: 'cover',
    marginLeft: -5,
    marginTop: -5,
    cursor: 'pointer',
  },
  imageIcon: {
    color: theme.palette.common.white,
    fontSize: '5rem',
  },
});

class Thumbnail extends Component {
  renderLoader = () => {
    return <CircularProgress color="secondary" size={75} />;
  };

  renderUnloader = () => {
    const { url, onClick, classes } = this.props;

    return (
      <div className={classes.imagePlaceholder} onClick={() => onClick(url)}>
        <ImageIcon className={classes.imageIcon} />
      </div>
    );
  };

  render() {
    const { url, className, onClick, classes } = this.props;

    return (
      <div className={classNames(classes.root, className)}>
        <Img
          src={url}
          alt=""
          loader={this.renderLoader()}
          unloader={this.renderUnloader()}
          className={classes.image}
          onClick={() => onClick(url)}
        />
      </div>
    );
  }
}

Thumbnail.propTypes = {
  classes: PropTypes.object.isRequired,
  url: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

export default decorate(styles)(Thumbnail);
