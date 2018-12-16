import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { decorate } from '../utils/component';
import { Helmet } from 'react-helmet';
import classNames from 'classnames';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  paper: {
    padding: theme.spacing.unit * 3,
  },
  message: {
    marginTop: theme.spacing.unit * 2,
  },
  actions: {
    marginTop: theme.spacing.unit * 2,
  },
});

function ScreenMessage(props) {
  const { title, message, actions, className, classes } = props;

  return (
    <Fragment>
      <Helmet>
        <title>{title}</title>
      </Helmet>

      <Grid
        container
        spacing={16}
        justify="center"
        className={classNames(classes.root, className)}
      >
        <Grid item xs={12} sm={8}>
          <Paper className={classes.paper} elevation={1}>
            <Typography variant="h5" component="h3">
              {title}
            </Typography>
            <Typography component="p" className={classes.message}>
              {message}
            </Typography>
            <div className={classes.actions}>
              {actions.map((action, index) => (
                <Fragment key={index}>{action}</Fragment>
              ))}
            </div>
          </Paper>
        </Grid>
      </Grid>
    </Fragment>
  );
}

ScreenMessage.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
};

export default decorate(styles)(ScreenMessage);
