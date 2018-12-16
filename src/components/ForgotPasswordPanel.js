import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { decorate } from '../utils/component';
import { Helmet } from 'react-helmet';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import green from '@material-ui/core/colors/green';

import { auth } from '../utils/firebase';

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    height: '100vh',
    overflow: 'auto',
    minWidth: 0,
    paddingTop: theme.spacing.unit * 15,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    width: 350,
  },
  error: {
    marginTop: theme.spacing.unit,
  },
  success: {
    marginTop: theme.spacing.unit * 2,
  },
  textField: {
    width: '100%',
  },
  actions: {
    marginTop: 40,
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
});

class ForgotPassword extends Component {
  constructor(props, context) {
    super(props, context);

    const { email } = props;

    this.state = {
      email,
      isLoading: false,
      isCompleted: false,
      error: null,
    };
  }

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  handleSubmit = async e => {
    e.preventDefault();

    this.setState({ isLoading: true, error: null });

    if (this.state.email.trim() === '') {
      this.setState({ isLoading: false, error: 'Please enter an email' });
    } else {
      try {
        await auth.sendPasswordResetEmail(this.state.email);
        this.setState({ isLoading: false, isCompleted: true });
      } catch (error) {
        this.setState({ isLoading: false, error: error.message });
      }
    }
  };

  render() {
    const { classes } = this.props;
    const { email, isLoading, isCompleted, error } = this.state;

    return (
      <Fragment>
        <Helmet>
          <title>Forgot Password</title>
        </Helmet>

        <Grid container className={classes.root} spacing={16}>
          <Grid item xs={12}>
            <Grid container justify="center" spacing={16}>
              <Grid item>
                <Paper className={classes.paper}>
                  <Typography variant="h5" component="h3">
                    Forgot Password
                  </Typography>

                  {error && (
                    <Typography
                      component="p"
                      color="error"
                      className={classes.error}
                    >
                      {error}
                    </Typography>
                  )}

                  {isCompleted ? (
                    <Typography component="p" className={classes.success}>
                      A password reset email has been sent to {email}. Please
                      check your inbox and follow the instructions to reset your
                      password.
                    </Typography>
                  ) : (
                    <form onSubmit={this.handleSubmit}>
                      <TextField
                        id="email"
                        label="Email"
                        className={classes.textField}
                        type="text"
                        autoComplete="current-email"
                        margin="normal"
                        value={email}
                        onChange={this.handleChange}
                      />

                      <Grid container className={classes.actions}>
                        <Grid item xs={6} />
                        <Grid item xs={6} style={{ textAlign: 'right' }}>
                          <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            disabled={isLoading}
                          >
                            Next
                            {isLoading && (
                              <CircularProgress
                                size={24}
                                className={classes.buttonProgress}
                              />
                            )}
                          </Button>
                        </Grid>
                      </Grid>
                    </form>
                  )}
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Fragment>
    );
  }
}

ForgotPassword.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default decorate(styles, { withRouter: true })(ForgotPassword);
