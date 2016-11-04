import React, { Component } from 'react';
import Img from '../../../assets/img/document.png';

export default class Document extends Component {
  render() {
	const {name, date, url} = this.props;
	return (
		<div className="document">
			<div className="name">
				<img src={Img} />
				<a href={url} target="_blank"><p>{name}</p></a>
			</div>
			<div className="date">
				<p>{date}</p>
			</div>	
		</div>
	);
  }
}
