import React, { Component } from 'react';
import {createFilter} from 'react-search-input'

export default class GradeSearch extends Component {
  constructor(props) {
    super(props);
    this.setGrade = this.setGrade.bind(this);
    this.changeSearch = this.changeSearch.bind(this);
    this.state = {
      search: this.props.search
    }
  }

  setGrade(grade) {
  	const {onChange, sulphur, spec} = this.props;
  	onChange(grade.grade);
  	sulphur(grade.maxSulphur);
  	spec(grade.spec);
  	this.setState({search: ''})
  }

  changeSearch(event) {
  	const {search, onChange} = this.props;
  	onChange(event.target.value);
  	this.setState({search: search})
  }

  render() {
    const {onChange} = this.props;
    let {search} = this.props;
    search = search ? search : '';
    const filteredGrades = gradeList.filter(createFilter(search, ['grade']))
    let searchResults = null;
    if (search !== '') {
      searchResults = filteredGrades.map((grade, index) => {
          return (
            <div className="result" key={index}>
              <p onClick={this.setGrade.bind(this, grade)}>{grade.grade}</p>
            </div>
          )
        });
    };
    return (
          <div className="detail" style={{flexDirection: 'column'}}>
            <input className="create-input" value={search} onChange={this.changeSearch}/>
            {this.state.search !== '' || null ? 
            <div className="results">
            	{searchResults}
            </div> : null}
          </div>
    );
  }
}

const gradeList = [{
   grade: '100 CST',
   maxSulphur: '1.5%',
   spec: 'ISO 8217 2010'
},
{
   grade: 'DMA',
   maxSulphur: '1.5%',
   spec: 'ISO 8217 2010'
},
{
   grade: 'DMA 0.1%',
   maxSulphur: '0.1%',
   spec: 'ISO 8217 2010'
},
{
   grade: 'DMB',
   maxSulphur: '2%',
   spec: 'ISO 8217 2010'
},
{
   grade: 'DMX',
   maxSulphur: '1%',
   spec: 'ISO 8217 2010'
},
{
   grade: 'DMZ',
   maxSulphur: '1.5%',
   spec: 'ISO 8217 2010'
},
{
   grade: 'Lubes',
   maxSulphur: 'Null%',
   spec: 'ISO 8217 2010'
},
{
   grade: 'RMA 10a',
   maxSulphur: '3.5%',
   spec: 'ISO 8217 2010'
},
{
   grade: 'RMB 30',
   maxSulphur: '3.5%',
   spec: 'ISO 8217 2010'
},
{
   grade: 'RMD 40',
   maxSulphur: '3.5%',
   spec: 'ISO 8217 2010'
},
{
   grade: 'RMD 80',
   maxSulphur: '3.5%',
   spec: 'ISO 8217 2010'
},
{
   grade: 'RME 180',
   maxSulphur: '3.5%',
   spec: 'ISO 8217 2010'
},
{
   grade: 'RME 180 1%',
   maxSulphur: '1%',
   spec: 'ISO 8217 2010'
},
{
   grade: 'RMG 120',
   maxSulphur: '3.5%',
   spec: 'ISO 8217 2010'
},
{
   grade: 'RMG 180',
   maxSulphur: '3.5%',
   spec: 'ISO 8217 2010'
},
{
   grade: 'RMG 380',
   maxSulphur: '3.5%',
   spec: 'ISO 8217 2010'
},
{
   grade: 'RMG 380 1%',
   maxSulphur: '1%',
   spec: 'ISO 8217 2010'
},
{
   grade: 'RMG 500',
   maxSulphur: '3.5%',
   spec: 'ISO 8217 2010'
},
{
   grade: 'RMG 700',
   maxSulphur: '3.5%',
   spec: 'ISO 8217 2010'
},
{
   grade: 'RMK 380',
   maxSulphur: '3.5%',
   spec: 'ISO 8217 2010'
},
{
   grade: 'RMK 500',
   maxSulphur: '3.5%',
   spec: 'ISO 8217 2010'
},
{
   grade: 'RMK 700',
   maxSulphur: '3.5%',
   spec: 'ISO 8217 2010'
},
{
   grade: 'ULSFO 0.1%',
   maxSulphur: '0.1%',
   spec: 'ISO 8217 2010'
},
{
   grade: 'IFO 380 ',
   maxSulphur: '3.5%',
   spec: 'ISO 8217 2010'
},
{
   grade: 'IFO 180 ',
   maxSulphur: '3.5%',
   spec: 'ISO 8217 2010'
},
{
   grade: 'LS 380 ',
   maxSulphur: '1%',
   spec: 'ISO 8217 2010'
},
{
   grade: 'LS 180 ',
   maxSulphur: '1%',
   spec: 'ISO 8217 2010'
},
{
   grade: 'MDO ',
   maxSulphur: '0.1%',
   spec: 'ISO 8217 2010'
},
{
   grade: 'MGO ',
   maxSulphur: '0.1%',
   spec: 'ISO 8217 2010'
},
{
   grade: 'HFO ',
   maxSulphur: '3.5%',
   spec: 'ISO 8217 2010'
}];