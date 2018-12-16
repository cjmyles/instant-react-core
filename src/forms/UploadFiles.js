import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { decorate } from '../utils/component';
import { FieldArray } from 'redux-form';
import { validation } from '../utils/form';

import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Typography from '@material-ui/core/Typography';
import PureUploadFiles from '../components/UploadFiles';

const styles = theme => ({
  root: {},
  label: {
    marginBottom: 10,
  },
});

class UploadFiles extends Component {
  renderFields(props) {
    const {
      fields,
      label,
      classes,
      fullWidth,
      required,
      storageRef,
      max,
      meta: { /*touched,*/ error, warning },
      // ...rest
    } = props;

    const getFileIndex = file =>
      fields.getAll().findIndex(f => f.fullPath === file.fullPath);

    const handleAddFile = file => {
      fields.push(file);
    };

    const handleUpdateFile = file => {
      const index = getFileIndex(file);
      fields.remove(index);
      fields.insert(index, file);
    };

    const handleRemoveFile = file => {
      fields.remove(getFileIndex(file));
    };

    return (
      <FormControl
        component="fieldset"
        required={required}
        fullWidth={fullWidth}
        className={classes.root}
      >
        {label && (
          <FormLabel component="legend" className={classes.label}>
            {label}
          </FormLabel>
        )}

        <PureUploadFiles
          files={fields.getAll()}
          storageRef={storageRef}
          onAddFile={handleAddFile}
          onUpdateFile={handleUpdateFile}
          onRemoveFile={handleRemoveFile}
          limit={max}
          //{...input}
          //{...rest}
          className={classes.uploadFiles}
        />

        {fields.length > 0 &&
          ((error && <Typography color="error">{error}</Typography>) ||
            (warning && <Typography color="primary">{warning}</Typography>))}
      </FormControl>
    );
  }

  render() {
    const { min, max, ...rest } = this.props;
    let validate;
    if (min || max) {
      validate = validation.files(min, max);
    }
    return (
      <FieldArray
        name="files"
        component={this.renderFields}
        validate={validate}
        max={max}
        {...rest}
      />
    );
  }
}

UploadFiles.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default decorate(styles)(UploadFiles);
