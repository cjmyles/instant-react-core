import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { decorate } from '../utils/component';
import classNames from 'classnames';

import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    overflow: 'hidden',
    backgroundColor: 'transparent',
  },
  multipleImages: {
    justifyContent: 'space-around',
  },
  gridList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This costs memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  image: {
    cursor: 'pointer',
  },
});

class ImageList extends Component {
  render() {
    const { images, className, onClick, classes } = this.props;

    return images.length === 0 ? null : (
      <div
        className={classNames(
          classes.root,
          images.length > 1 ? classes.multipleImages : null,
          className
        )}
      >
        <GridList className={classes.gridList} cols={2.5}>
          {images.map((image, index) => {
            const url = typeof image === 'string' ? image : image.url;
            return (
              <GridListTile key={index}>
                <img
                  src={url}
                  alt=""
                  onClick={() => onClick(url)}
                  className={classes.image}
                />
              </GridListTile>
            );
          })}
        </GridList>
      </div>
    );
  }
}

ImageList.propTypes = {
  classes: PropTypes.object.isRequired,
  images: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  onClick: PropTypes.func,
};

export default decorate(styles)(ImageList);
