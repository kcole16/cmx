import React, { Component } from 'react';
import ThumbsUp from '../../../assets/img/thumb-up-button.png';
import ThumbsDown from '../../../assets/img/thumb-down-button.png';

export default class Review extends Component {
  render() {
	const { handleSelect, positive, negative } = this.props;
	const positiveStyle = positive ? {border: '3px solid green'} : null;
	const negativeStyle = negative ? {border: '3px solid red'} : null;
	return (
		<div className="info-container">
          <div className="title">
            <label>REVIEW SELLER</label>
          </div>
          <div className="review">
          	<div className="label">
          		<label>How was your experience with Supplier A?</label>
          	</div>
          	<div className="select">
          		<div className="option" onClick={handleSelect.bind(this, 'positive')}>
	          		<div className="select-box" style={positiveStyle}>
	          			<img src={ThumbsUp} />
	          		</div>
	          		<label style={{color: 'green'}}>Positive</label>
	          	</div>
          		<div className="option" onClick={handleSelect.bind(this, 'negative')}>
	          		<div className="select-box" style={negativeStyle}>
	          			<img src={ThumbsDown} />
	          		</div>
	          		<label style={{color: 'red'}}>Negative</label>
	          	</div>
	         </div>
	       </div>
		</div>
	);
  }
}
