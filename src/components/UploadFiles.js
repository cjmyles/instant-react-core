import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { decorate } from '../utils/component';
import FileUploader from 'react-firebase-file-uploader';
// import { FieldArray } from 'redux-form';
import FileUploading from '../components/FileUploading';
import FileUploaded from '../components/FileUploaded';
import ImageDialog from '../components/ImageDialog';

// import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
// import Icon from '@material-ui/core/Icon';
import List from '@material-ui/core/List';

const styles = theme => ({
  root: {},
  list: {},
  listItem: {
    display: 'flex',
    flexDirection: 'row',
    paddingLeft: 0,
    alignItems: 'start',
  },
  button: {},
  buttonIcon: {
    marginRight: 10,
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
  placeholderImage: {
    height: 165,
    width: 165,
    color: 'rgba(0,0,0,0.2)',
  },
  fileData: {
    marginBottom: theme.spacing.unit,
  },
  fileName: {
    marginRight: theme.spacing.unit * 2,
  },
  uploadProgress: {
    marginBottom: theme.spacing.unit,
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
  image: {
    height: 135,
    width: 135,
    objectFit: 'cover',
    marginLeft: -5,
    marginTop: -5,
    cursor: 'pointer',
  },
});

class UploadFiles extends Component {
  state = {
    selectedImage: null,
  };

  get validFiles() {
    return this.props.files
      ? this.props.files.filter(file => file.progress === 100 && !file.error)
      : [];
  }

  get limitMet() {
    const { limit } = this.props;
    return limit && limit === this.validFiles.length;
  }

  updateFile = (fullPath, attributes) => {
    const file = this.props.files.find(f => f.fullPath === fullPath);
    this.props.onUpdateFile({
      ...file,
      ...attributes,
    });
    // const files = this.props.files.map(
    //   file => (file.fullPath === fullPath ? { ...file, ...attributes } : file)
    // );
    // this.props.onUpdateFiles(files);
    // this.setState({ files }, cb);
  };

  handleUploadStart = async (file, task) => {
    const data = {
      fullPath: task.snapshot.ref.fullPath,
      name: file.name,
      size: file.size,
      type: file.type,
      progress: 0,
      error: null,
    };
    // let files = this.props.files ? [...this.props.files] : [];
    // files.push(data);
    // this.props.onUpdateFiles(files);
    this.props.onAddFile(data);
  };

  handleProgress = async (progress, task) => {
    this.updateFile(task.snapshot.ref.fullPath, { progress });
  };

  handleUploadError = async (error, task) => {
    this.updateFile(task.snapshot.ref.fullPath, { error });
  };

  handleUploadSuccess = async (filename, task) => {
    const url = await this.props.storageRef.child(filename).getDownloadURL();
    this.updateFile(task.snapshot.ref.fullPath, { progress: 100, url });
  };

  handleRemoveFile = fullPath => {
    // const files = this.props.files.filter(file => file.fullPath !== fullPath);
    // this.props.onUpdateFiles(files);
    this.props.onRemoveFile(fullPath);
  };

  handleClickImage = image => {
    this.setState({ selectedImage: image });
  };

  handleClose = () => {
    this.setState({ selectedImage: null });
  };

  renderFiles = () => {
    const { files, classes } = this.props;

    return files && files.length > 0 ? (
      <List className={classes.list}>
        {files.map((file, index) =>
          file.progress < 100 ? (
            <FileUploading key={index} file={file} />
          ) : (
            <FileUploaded
              key={index}
              file={file}
              onClickFile={this.handleClickImage}
              onRemove={this.handleRemoveFile}
            />
          )
        )}
      </List>
    ) : null;
  };

  render() {
    const { storageRef, classes } = this.props;
    const { selectedImage } = this.state;
    const limitMet = this.limitMet;

    return (
      <div className={classes.root}>
        {!limitMet && (
          <Fragment>
            <FileUploader
              id="fileUploader"
              accept="image/*"
              maxWidth={1000}
              quality={0.9}
              randomizeFilename
              storageRef={storageRef}
              hidden
              onUploadStart={this.handleUploadStart}
              onUploadError={this.handleUploadError}
              onUploadSuccess={this.handleUploadSuccess}
              onProgress={this.handleProgress}
            />
            <label htmlFor="fileUploader">
              <Button
                variant="contained"
                component="span"
                color="primary"
                className={classes.button}
              >
                {/* <Icon className={classes.buttonIcon}>photo</Icon> */}
                Upload File
              </Button>
            </label>
          </Fragment>
        )}

        {this.renderFiles()}

        <ImageDialog
          open={!!selectedImage}
          onClose={this.handleClose}
          image={selectedImage}
        />
      </div>
    );
  }
}

UploadFiles.propTypes = {
  classes: PropTypes.object.isRequired,
  storageRef: PropTypes.object.isRequired,
  limit: PropTypes.number,
};

export default decorate(styles)(UploadFiles);
