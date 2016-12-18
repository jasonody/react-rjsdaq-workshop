import React from 'react';
import PriceAge from './PriceAge';

const GRAPH_BAR_WIDTH = 18;
const GRAPH_BAR_MARGIN = 5;

var Security = React.createClass({
	
	propTypes: {
		name: React.PropTypes.string.isRequired,
		price: React.PropTypes.number,
		symbol: React.PropTypes.string.isRequired
	},
	getInitialState: function () {
		
		return {
			priceHistory: this.props.price == null ? [] : [this.props.price],
			graphWidth: null
		};
	},
	_storeGraphWidth: function () {

		var width = React.findDOMNode(this.refs.priceGraph).clientWidth;
		this.setState({ graphWidth: width });
	},
	componentDidMount: function () {
		
		this._storeGraphWidth();
		window.addEventListener('resize', this._storeGraphWidth);
	},
	componentWillUnmount: function () {
		
		window.removeEventListener('resize', this._storeGraphWidth);
	},
	componentWillReceiveProps: function (nextProps) {
		
		var priceHistory = this.state.priceHistory;
		
		if (nextProps.price !== this.props.price) {
			this.setState({ priceHistory: priceHistory.concat(nextProps.price) });
		}
	},
	renderPriceGraph: function () {
		
		var minPrice, maxPrice;
		var priceHistory = this.state.priceHistory;
		
		if (this.state.graphWidth) {
			priceHistory = this.state.priceHistory.slice(-Math.floor(
				(this.state.graphWidth - GRAPH_BAR_MARGIN) / (GRAPH_BAR_WIDTH + GRAPH_BAR_MARGIN)
			));
		}
		
		priceHistory.forEach(function (price) {
			
			if (minPrice == null || minPrice > price) {
				minPrice = price;
			}
			if (maxPrice == null || maxPrice < price) {
				maxPrice = price;
			}
		});
		
		var delta = maxPrice - minPrice;
		
		return priceHistory.map(function (price, i) {
			
			var height = delta === 0 ? 100 : 10;
			
			if (delta > 0) {
				height += 90 * (1 - ((maxPrice - price) / delta))
			}
			
			return (
				<li key={i} style={{height: height + '%'}}>{price}¢</li>
			);
		});
	},
	renderPriceChange: function () {
		
		var changeText = '';
		var changeClass = 'change';
		var priceHistory = this.state.priceHistory;
				
		if (priceHistory.length > 1) {
			var newPrice = priceHistory[priceHistory.length - 1];
			var previousPrice = priceHistory[priceHistory.length - 2];
			
			var priceChange = (((newPrice - previousPrice) / previousPrice) *100).toFixed(1);
			var priceChangeSign = priceChange > 0 ? '+' : '';
			
			changeText = `${priceChangeSign}${priceChange}%`;
			changeClass += priceChange > 0 ? ' increasing' : ' decreasing';
		}
		
		return (
			<p className={changeClass}>{changeText}</p>
		);
	},
	renderPriceTrend: function () {
		
		var trendText = '';
		var trendClass = 'trend';
		var priceHistory = this.state.priceHistory;
		
		if (priceHistory.length < 10) {
			trendText = '–';
		} else {
			priceHistory = priceHistory.slice(-10);
			
			var sum = priceHistory.reduce(function (p, sum) {
				
				return p + sum;
			});
			var average = sum / 10;
			var trendPercent = (((this.props.price - average) / average) * 100).toFixed(1);
			var trendSign = trendPercent > 0 ? '+' : '';
			
			trendText = `${trendSign}${trendPercent}%`;
			trendClass += trendPercent > 0 ? ' increasing' : ' decreasing';
		}
		
		return (
			<p className={trendClass}>{trendText}</p>
		);
	},
	render: function () {
		
		var price = this.props.price == null ? '–' : this.props.price + '¢';
				
		return (
			<li>
				<h2>{this.props.name} <small>{this.props.symbol.toUpperCase()}</small></h2>
				<p className="price">{price}</p>

				<PriceAge price={this.props.price}></PriceAge>

				<ul className="quotes" ref="priceGraph">
					{this.renderPriceGraph()}
				</ul>

				<section className="analytics">
					<h3>Change</h3>
					{this.renderPriceChange()}
	
					<h3>Trend</h3>
					{this.renderPriceTrend()}
				</section>
			</li>		
		);
	}
});

export default Security;