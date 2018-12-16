import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { decorate } from '../utils/component';
import numeral from 'numeral';

import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';
import ListItem from '@material-ui/core/ListItem';
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
  metaContainer: {
    flex: 1,
    paddingTop: 15,
  },
  // placeholderImage: {
  //   height: 135,
  //   width: 135,
  //   color: 'rgba(0,0,0,0.2)',
  // },
  fileData: {
    marginBottom: theme.spacing.unit,
  },
  fileName: {
    marginRight: theme.spacing.unit * 2,
  },
  uploadProgress: {
    marginBottom: theme.spacing.unit,
  },
});

class FileUploading extends Component {
  render() {
    const { file, classes } = this.props;

    return (
      <ListItem key={file.fullPath} className={classes.listItem}>
        <div className={classes.visualContainer}>
          <div className={classes.imageWrapper}>
            <ImageIcon className={classes.imagePlaceholder} />
          </div>
        </div>

        <div className={classes.metaContainer}>
          <div>
            <Typography className={classes.fileData}>
              {file.name && (
                <span className={classes.fileName}>
                  <strong>{file.name}</strong>
                </span>
              )}
              {numeral(file.size).format('0.0 b')}
            </Typography>
          </div>

          {file.error ? (
            <Typography component="p" color="error" className={classes.error}>
              {file.error.message_}
            </Typography>
          ) : (
            <Fragment>
              <LinearProgress
                variant="determinate"
                value={file.progress}
                color="secondary"
                className={classes.uploadProgress}
              />
              <Typography>{file.progress}% uploaded</Typography>
            </Fragment>
          )}
        </div>
      </ListItem>
    );
  }
}

FileUploading.propTypes = {
  classes: PropTypes.object.isRequired,
  file: PropTypes.object.isRequired,
};

export default decorate(styles)(FileUploading);
