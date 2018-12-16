import React from 'react';
import PropTypes from 'prop-types';
import { decorate } from '../utils/component';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import ScreenMessage from './ScreenMessage';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  root: {},
});

function PageNotFound(props) {
  const { className, classes } = props;

  return (
    <ScreenMessage
      title="(404) Page Not Found"
      message="Sorry, the page you are looking for can not be found."
      actions={[
        <Button
          component={Link}
          variant="contained"
          color="primary"
          to="/"
          className={classes.button}
        >
          Go to homepage
        </Button>,
      ]}
      className={classNames(classes.root, className)}
    />
  );
}

PageNotFound.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default decorate(styles)(PageNotFound);
