import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { decorate } from '../utils/component';
import { Helmet } from 'react-helmet';

import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  headline: {},
});

function PageHeading(props) {
  const { title, heading, showHeading = true, classes } = props;

  return (
    <Fragment>
      <Helmet>
        <title>{title}</title>
      </Helmet>

      {showHeading && (
        <Typography
          variant="h5"
          component="h3"
          align="center"
          color="default"
          className={classes.headline}
        >
          {heading || title}
        </Typography>
      )}
    </Fragment>
  );
}

PageHeading.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default decorate(styles)(PageHeading);
