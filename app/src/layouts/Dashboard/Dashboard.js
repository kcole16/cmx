require('../../styles/dashboard.scss');

import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions/index';
import {reduxForm, getValues} from 'redux-form';
import { browserHistory, Link } from 'react-router';
import Enquiry from './components/Enquiry';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.createEnquiry = this.createEnquiry.bind(this);
  }

  componentWillMount() {
    const {actions} = this.props;
    actions.fetchGetDeals();
  }

  createEnquiry() {
    const {actions} = this.props;
    actions.createDeal();
    browserHistory.push('/quoteSpecifics');
  }

  render() {
    const {state} = this.props;
    // const enquiryList = [{
    //     vessel: 'Happy Camper',
    //     port: 'Gibraltar',
    //     eta: '15/12/2016',
    //     orders: [{
    //       grade: 'IFO 380'
    //     }]
    // }, {
    //     vessel: 'Maple Soul',
    //     port: 'Malta',
    //     eta: '18/12/2016',
    //     orders: [{
    //       grade: 'MGO 380'
    //     }]
    // }, {
    //     vessel: 'Maple Soul',
    //     port: 'Malta',
    //     eta: '18/12/2016',
    //     orders: [{
    //       grade: 'MGO 380'
    //     }]
    // }];
    const enquiryList = state.deals.enquiries;
    const enquiries = enquiryList.map((enquiry, index) => {
      if (enquiry.status === 'enquiry') {
        return (
          <Enquiry 
            key={index} 
            vessel={enquiry.vessel} 
            port={enquiry.port} 
            eta={enquiry.eta} 
            orders={enquiry.orders} />
        )
      };
    });
    return (
      <div>
        <div className="main-bar dashboard">
          <label className="nav-link active">DASHBOARD</label>
          <label className="nav-link inactive">PRICES</label>
          <label className="nav-link inactive">VIEW QUOTES</label>
          <div className="new-project">
            <button onClick={this.createEnquiry}>+ Create Enquiry</button>
          </div>
        </div>
        <div className="main-app-container">
          <div className="layout-container">
            <div className="enquiries">
              <div className="title">
                <label>Working Enquiries</label>
              </div>
              {enquiries}
              <div className="title">
                <label>Orders</label>
              </div>
              <div className="title">
                <label>Deals (not Delivered)</label>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    state: state
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
