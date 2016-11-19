import React, { Component } from 'react';

export default class VesselSearch extends Component {
  constructor(props) {
    super(props);
    this.setVessel = this.setVessel.bind(this);
    this.changeSearch = this.changeSearch.bind(this);
    this.updateResults = this.updateResults.bind(this);
    this.state = {
      search: this.props.vessel.value,
      vesselList: []
    }
  }

  updateResults(results) {
    const hits = results.hits.hit.map((hit) => {
      return hit.fields.vessel
    });
    this.setState({vesselList: hits});
  }

  setVessel(vesselVal) {
  	const {vessel} = this.props;
  	vessel.onChange(vesselVal);
  	this.setState({search: ''})
  }

  changeSearch(event) {
  	const {search, vessel} = this.props;
  	vessel.onChange(event.target.value);
  	this.setState({search: search})
    const value = event.target.value;
    console.log(value);
    const url = 'https://b35fi1yzak.execute-api.us-east-1.amazonaws.com/prod?q='+value+'*';
    fetch(url, {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
    .then(res => res.json())
    .then(json => this.updateResults(json))
  }

  render() {
    const {search, vessel} = this.props;
    let searchResults = null;
    if (search !== '') {
      searchResults = this.state.vesselList.map((vessel, index) => {
          return (
            <div className="result" key={index}>
              <p onClick={this.setVessel.bind(this, vessel)}>{vessel}</p>
            </div>
          )
        });
    };
    return (
        <div className="form-data" style={{flexDirection: 'column'}}>
          <label>Vessel [IMO]<sup>*</sup></label>
          <input 
            type="text" 
            placeholder="Search by Vessel or IMO" 
            className={vessel.touched && vessel.error ? "error-input" : "create-input"} 
            value={vessel.value}
            onChange={this.changeSearch} />
          {vessel.touched && vessel.error && <div className="error">{vessel.error}</div>}
          {this.state.search !== '' || null ? 
          <div className="results">
            {searchResults}
          </div> : null}
        </div>
    );
  }
}