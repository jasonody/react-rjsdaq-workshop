import React from 'react';

var PriceAge = React.createClass({

	propTypes: {
		price: React.PropTypes.number
	},
	getInitialState: function () {

		return {
			lastPriceUpdate: this.props.price == null ? null : Date.now(),
			priceAge: 'never'
		};
	},
	componentWillUnmount: function () {

		clearInterval(this._intervalId);
	},
	componentWillReceiveProps: function (nextProps) {
		
		if (this.props.price !== nextProps.price) {
			this.setState({ 
				lastPriceUpdate: Date.now(),
				priceAge: 'just now'
			});
			
			clearInterval(this._intervalId);
			this._intervalId = setInterval(this.updatePriceAge, 1000);
		}
	},
	updatePriceAge: function () {
		
		if (this.state.lastPriceUpdate) {
			var seconds = Math.floor((Date.now() - this.state.lastPriceUpdate) / 1000);
			
			this.setState({ priceAge: seconds + 's ago' });
		}
	},
	render: function () {

		return (
			<p className="lastUpdated">Updated {this.state.priceAge}</p>
		);
	}
});

export default PriceAge;