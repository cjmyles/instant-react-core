import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { decorate } from '../utils/component';
import Img from 'react-image';
import numeral from 'numeral';

import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import ListItem from '@material-ui/core/ListItem';
import RemoveCircle from '@material-ui/icons/RemoveCircle';
import ImageIcon from '@material-ui/icons/Image';
import grey from '@material-ui/core/colors/grey';

const styles = theme => ({
  root: {},
  listItem: {
    display: 'flex',
    flexDirection: 'row',
    paddingLeft: 0,
    alignItems: 'start',
  },
  visualContainer: {
    // width: 167,
    // height: 150,
    padding: 10,
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    flexFlow: 'row nowrap',
    alignItems: 'center',
    overflow: 'hidden',
    marginRight: 20,
  },
  removeFile: {
    position: 'absolute',
    top: 10,
    left: 0,
    color: 'red',
    cursor: 'pointer',
  },
  metaContainer: {
    flex: 1,
    paddingTop: 15,
  },
  fileData: {
    marginBottom: theme.spacing.unit,
  },
  fileName: {
    marginRight: theme.spacing.unit * 2,
  },
  imageWrapper: {
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

class FileUploaded extends Component {
  handleClickFile = file => {
    this.props.onClickFile(file, 'image');
  };

  renderImagePlaceholder = () => {
    const { file, classes } = this.props;

    return (
      <div
        className={classes.imagePlaceholder}
        onClick={event => this.handleClickFile(file.url)}
      >
        <ImageIcon className={classes.imageIcon} />
      </div>
    );
  };

  render() {
    const { file, classes } = this.props;

    return (
      <ListItem key={file.fullPath} className={classes.listItem}>
        <div className={classes.visualContainer}>
          <RemoveCircle
            className={classes.removeFile}
            //onClick={() => fields.remove(index)}
            onClick={() => this.props.onRemove(file.fullPath)}
          />
          <div className={classes.imageWrapper}>
            <Img
              src={file.url}
              alt=""
              loader={<CircularProgress color="secondary" size={75} />}
              unloader={this.renderImagePlaceholder()}
              className={classes.image}
              onClick={event => this.handleClickFile(file.url)}
            />
          </div>
        </div>
        <div className={classes.metaContainer}>
          <Typography className={classes.fileData}>
            {file.name && (
              <span className={classes.fileName}>
                <strong>{file.name}</strong>
              </span>
            )}
            {numeral(file.size).format('0.0 b')}
          </Typography>
        </div>
      </ListItem>
    );
  }
}

FileUploaded.propTypes = {
  classes: PropTypes.object.isRequired,
  file: PropTypes.object.isRequired,
};

export default decorate(styles)(FileUploaded);
