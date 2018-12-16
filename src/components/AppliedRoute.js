import React, { Component } from 'react';
import { Route } from 'react-router-dom';

export default class extends Component {
  renderComponent(C, L, props, cProps) {
    return L ? (
      <L>
        <C {...props} {...cProps} />
      </L>
    ) : (
      <C {...props} {...cProps} />
    );
  }

  render() {
    const { component: C, layout: L, props: cProps, ...rest } = this.props;

    return (
      <Route
        {...rest}
        render={props => this.renderComponent(C, L, props, cProps)}
      />
    );
  }
}
