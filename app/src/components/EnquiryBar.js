import React, { Component } from 'react';
import { Link } from 'react-router';

export default class EnquiryBar extends Component {
  render() {
    const {order} = this.props;
    return (
      <div className="main-bar">
        <Link className="nav-link" to="/app/quoteSpecifics" activeClassName="active">Create Enquiry</Link>
        <Link className="nav-link" to="/app/suppliers" activeClassName="active">Select Suppliers</Link>
        <Link className="nav-link" to="/app/viewQuotes" activeClassName="active">View Quotes</Link>
      </div>
    );
  }
}
