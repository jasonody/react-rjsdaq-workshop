import React from 'react';

var Holding = React.createClass({

	propTypes: {
		cashHoldings: React.PropTypes.number.isRequired,
		price: React.PropTypes.number,
		symbol: React.PropTypes.string.isRequired,
		unitsHeld: React.PropTypes.number.isRequired,
	},
	getInitialState: function () {
		
		return {
			units: '',
			isValid: false,
			canSubmit: true
		};
	},
	handleUnitsChange: function (e) {
		
		var value = e.target.value;
		console.log(value);
		if (/^(|[1-9]+[0-9]*)$/.test(value)) {
			this.setState({	
				units: value,
				isValid: true
			});
		} else {
			this.setState({ isValue: false });
		}
	},
	isValid: function () {
		
		return this.state.isValid;
	},
	render: function () {

		return (
			<tr>
				<th>{this.props.symbol.toUpperCase()}</th>
				<td>{this.props.unitsHeld} units</td>
				<td>
					<input type="text" disabled={!this.state.canSubmit} 
						value={this.state.units} onChange={this.handleUnitsChange} />
					<button className="buy" disabled={!this.isValid() || !this.state.canSubmit}>Buy</button>
					<button className="sell" disabled={!this.isValid() || !this.state.canSubmit}>Sell</button>
				</td>
			</tr>
		);
	}
});

export default Holding;