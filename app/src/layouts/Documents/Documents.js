require('../../styles/documents.scss');

import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions/index';
import {reduxForm, getValues} from 'redux-form';
import { browserHistory } from 'react-router';
import Document from './components/Documents';
import Modal from 'react-modal';

class Documents extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.pusher = new Pusher('213331f62067dec74527');
    this.channel = this.pusher.subscribe('test_channel');
    this.state = {
      active: [],
      modalIsOpen: false,
      quoteSelected: {
        name: null
      }
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
    return (
      <div className="layout-container">
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
