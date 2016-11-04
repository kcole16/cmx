import React, { Component } from 'react';
import { Link } from 'react-router';

export default class EnquiryBar extends Component {
  render() {
    const {order} = this.props;
    return (
      <div className="main-bar">
        <Link className="nav-link" to="quoteSpecifics" activeClassName="active">Create Enquiry</Link>
        <Link className="nav-link" to="suppliers" activeClassName="active">Select Suppliers</Link>
        <Link className="nav-link" to="viewQuotes" activeClassName="active">View Quotes</Link>
      </div>
    );
  }
}
