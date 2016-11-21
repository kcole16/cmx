require('../../styles/documents.scss');

import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions/index';
import {reduxForm, getValues} from 'redux-form';
import { browserHistory } from 'react-router';
import Document from './components/Document';
import Modal from 'react-modal';
import Back from '../../assets/img/back.png';

class Documents extends Component {
  constructor(props) {
    super(props);
    // this.openModal = this.openModal.bind(this);
    // this.closeModal = this.closeModal.bind(this);
    this.state = {
      modalIsOpen: false
    };
  }

  componentDidMount() {
    const {state, actions} = this.props;
  }

  // openModal(quote) {
  //   const {state} = this.props;
  //   this.setState({
  //     modalIsOpen: true,
  //     quoteSelected: quote
  //   })
  // }

  // closeModal() {
  //   this.setState({
  //     modalIsOpen: false,
  //     quoteSelected: {
  //       name: null
  //     }
  //   })
  // }

  render() {
    const {state, actions} = this.props;
    const deal = state.deals.active.deal;
    const docList = [{
      name: 'Contract',
      date: '27/11/2016',
      url: 'http://www.espn.com'
    },{
      name: 'Trade Recap',
      date: '26/11/2016',
      url: 'http://www.espn.com'
    }];
    const docs = docList.map((doc, index) => {
      return (
          <Document key={index} name={doc.name} date={doc.date} url={doc.url} />
        )
    });
    const orderGrades = deal.orders.map((order, index) => {
      return order.grade.slice(0,3);
    });
    const label = deal.vessel+ ' / ' + deal.port + ' / ' + deal.eta + ' / ' + orderGrades.join().replace(/,/g , " + ");
    return (
      <div>
        <div className="main-bar">
          <div className="title">
            <label>{deal.vessel} / {deal.port} / {deal.eta} / {deal.orders[0].grade}</label>
          </div>
        </div>
        <div className="main-app-container">
          <div className="layout-container">
            <div className="document-nav">
              <div className="label">
                <img src={Back} />
                <label onClick={() => {browserHistory.push('/app')}}>Back to Enquiries</label>
              </div>
              <div className="upload">
                <button style={{marginRight: 10}}>+ Upload Document</button>
                <button onClick={() => {browserHistory.push('/app/actualize')}}>Actualize Deal</button>
              </div>
            </div>
            <div className="documents">
              <div className="titles">
                <div className="doc">
                  <label>Name</label>
                </div>
                <div className="doc">
                  <label>Modified</label>
                </div>
              </div>
              {docs}
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
)(Documents);
