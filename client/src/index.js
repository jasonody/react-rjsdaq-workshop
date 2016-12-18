import React from 'react';
import RJSDAQ from './RJSDAQ';

import App from './components/App';

var SERVER_ADDRESS = 'localhost';
var SERVER_PORT = 5000;

// Connect to the server
var rootNode;
RJSDAQ.connect(SERVER_ADDRESS, SERVER_PORT, function(newData) {
  
	rootNode = rootNode || document.getElementById('root');
	console.log(newData);
	React.render(<App securities={newData.securities} cashHoldings={newData.cashHoldings} />, rootNode);
});

/* The following are commands that you can issue to the server
*
* - Buy (eg. 10 units of 'fxs')
*
*   RJSDAQ.buy('fxs', 10, function(err) { console.log(err); });
*
* - Sell (eg. 50 units of 'bny')
*
*   RJSDAQ.sell('bny', 50, function(err) { console.log(err); });
*
* - Go Public (ie. List your own security with a 3-letter symbol and a name)
*
*   RJSDAQ.goPublic('bik', 'Bikes', function(err) { console.log(err); });
*
*/
