import React from 'react';
import Holding from './Holding';

var Portfolio = React.createClass({
	
	propTypes: {
		securities: React.PropTypes.objectOf(
			React.PropTypes.shape({
				name: React.PropTypes.string.isRequired,
				price: React.PropTypes.number,
				unitsHeld: React.PropTypes.number.isRequired,
			})
		),
		cashHoldings: React.PropTypes.number.isRequired
	},
	renderHolding: function (symbol) {
		
		var security = this.props.securities[symbol];
		
		return (
			<Holding key={symbol} symbol={symbol} unitsHeld={security.unitsHeld}
			price={security.price} cashHoldings={this.props.cashHoldings}/>
		);
	},
	renderHoldings: function () {
		
		var securities = this.props.securities;
		
		return Object.keys(securities).sort().map(this.renderHolding);
	},
	render: function () {
		
		return (
			<div>
				<h2>My portfolio</h2>

				<p>You have <strong>${(this.props.cashHoldings / 100).toFixed(2)}</strong> in cash reserves</p>

				<section id="portfolio">
					<table>
						<tbody>
							{this.renderHoldings()}
						</tbody>
					</table>
				</section>
			</div>
		);
	}
});

export default Portfolio;