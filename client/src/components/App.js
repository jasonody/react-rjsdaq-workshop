import React from 'react';
import Security from './Security';
import Portfolio from './Portfolio';

var App = React.createClass({
	
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
	getInitialState: function () {
		
		return {
			sortKey: 'name',
			sortOrder: 'asc'
		};
	},
	_handleSortKeyChange: function (e) {
		
		this.setState({sortKey: e.target.value});
	},
	_handleSortOrderChange: function (e) {
		
		this.setState({sortOrder: e.target.value});
	},
	renderSecurity: function (symbol) {
		
		var security = this.props.securities[symbol];
		
		return (
			<Security key={symbol} name={security.name} symbol={symbol} price={security.price} />	
		);
	},
	renderSecurities: function () {
		
		var securities = this.props.securities;
		var securitySymbols = Object.keys(securities);
		var sortKey = this.state.sortKey;
		var sortOrder = this.state.sortOrder;		
		var sortedSecuritySymbols;
		
		if (sortKey === 'name') {
			sortedSecuritySymbols = securitySymbols.sort(function (a, b) {
				
				if (sortOrder === 'asc') {
					return securities[a].name > securities[b].name;
				} else {
					return securities[a].name < securities[b].name;
				}
			});
		} else {
			sortedSecuritySymbols = securitySymbols.sort(function (a, b) {

				if (sortOrder === 'asc') {
					return securities[a].price > securities[b].price;
				} else {
					return securities[a].price < securities[b].price;
				}
			});
		}
		
		return sortedSecuritySymbols.map(this.renderSecurity);
	},
	render: function () {
		
		return (
			<div>
				<section className="console">

					<h1>The RJSDAQ</h1>

					<label htmlFor="sortKey">Sort by</label>
					<select id="sortKey" onChange={this._handleSortKeyChange} value={this.state.sortKey}>
						<option value="name">Name</option>
						<option value="price">Price</option>
					</select>
					<select id="sortOrder" onChange={this._handleSortOrderChange} value={this.state.sortOrder}>
						<option value="asc">Ascending</option>
						<option value="desc">Descending</option>
					</select>

					<Portfolio cashHoldings={this.props.cashHoldings} securities={this.props.securities} />

					<h2>Go public</h2>
					<p>You've earned it</p>

					<form id="goPublic">
						<input id="newSecurityName" placeholder="Name (eg. Alphabet soup)" type="text" />
						<input id="newSecuritySymbol" placeholder="Symbol (eg. ABC)" type="text" />
						<input disabled="disabled" type="submit" value="Go public!" />
					</form>
				</section>

				<ul id="securities">
					{this.renderSecurities()}
				</ul>
			</div>
		);
	}
});

export default App;