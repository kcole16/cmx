import React, { Component } from 'react';
import { Link } from 'react-router';

export default class OperatorBar extends Component {
  render() {
    const {order} = this.props;
    return (
      <div className="main-bar">
        <Link className="nav-link" to="/app/quoteSpecifics" activeClassName="active">Create Bunker Order</Link>
      </div>
    );
  }
}