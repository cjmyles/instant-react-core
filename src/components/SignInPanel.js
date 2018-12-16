import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { decorate } from '../utils/component';
import { Helmet } from 'react-helmet';
import { auth } from '../utils/firebase';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import green from '@material-ui/core/colors/green';

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
  textField: {
    width: '100%',
  },
  actions: {
    marginTop: 40,
  },
  actionsLink: {
    color: '#4285f4',
    textDecoration: 'none',
    fontSize: 14,
    cursor: 'pointer',
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

class SignIn extends React.Component {
  state = {
    isLoading: false,
    email: '',
    password: '',
    error: null,
  };

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
    } else if (this.state.password.trim() === '') {
      this.setState({ isLoading: false, error: 'Please enter a password' });
    } else {
      try {
        await auth.signInWithEmailAndPassword(
          this.state.email,
          this.state.password
        );
        // this.props.userHasAuthenticated(true);
      } catch (error) {
        this.setState({ isLoading: false, error: error.message });
      }
    }
  };

  handleClickForgotPassword = () => {
    this.props.onClickForgotPassword(this.state.email);
  };

  render() {
    const { classes } = this.props;

    return (
      <Fragment>
        <Helmet>
          <title>Sign In</title>
        </Helmet>

        <Grid container className={classes.root} spacing={16}>
          <Grid item xs={12}>
            <Grid container justify="center" spacing={16}>
              <Grid item>
                <Paper className={classes.paper}>
                  <Typography variant="h5" component="h3">
                    Sign in
                  </Typography>

                  {this.state.error && (
                    <Typography
                      component="p"
                      color="error"
                      className={classes.error}
                    >
                      {this.state.error}
                    </Typography>
                  )}

                  <form onSubmit={this.handleSubmit}>
                    <TextField
                      id="email"
                      label="Email"
                      className={classes.textField}
                      type="text"
                      autoComplete="current-email"
                      margin="normal"
                      value={this.state.email}
                      onChange={this.handleChange}
                    />
                    <TextField
                      id="password"
                      label="Password"
                      className={classes.textField}
                      type="password"
                      autoComplete="current-password"
                      margin="normal"
                      value={this.state.password}
                      onChange={this.handleChange}
                    />

                    <Grid container className={classes.actions}>
                      <Grid item xs={6}>
                        <Typography
                          className={classes.actionsLink}
                          onClick={this.handleClickForgotPassword}
                        >
                          Forgot password?
                        </Typography>
                      </Grid>
                      <Grid item xs={6} style={{ textAlign: 'right' }}>
                        <Button
                          variant="contained"
                          color="primary"
                          type="submit"
                          disabled={this.state.isLoading}
                        >
                          Next
                          {this.state.isLoading && (
                            <CircularProgress
                              size={24}
                              className={classes.buttonProgress}
                            />
                          )}
                        </Button>
                      </Grid>
                    </Grid>
                  </form>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Fragment>
    );
  }
}

SignIn.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default decorate(styles, { withRouter: true })(SignIn);
