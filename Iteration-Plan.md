# Iteration #0
**Create your first components from HTML markup**
* Slice the static markup into live components to get a hang of writing render methods
* Think-pair-share: What are some sensible component boundaries?

# Iteration #1
**Render the securities**
* Requirements:
  * Render one security component per security in the data
  * Set the name, symbol, and price of the security (or a dash if there is no price)
* Think-pair-share: Approach to doing the above

# Iteration #2
**Implement the "Updated {n}s ago" timer**
* Requirements:
  * If there is no price, render ‘Updated never’
  * If the price has been updated less than a second ago, render ‘Updated just now’
  * Update the age every second
* Think-pair-share: Is updated time part of state or part of props? Approach?

# Iteration #3
**Implement the change % indicator**
* Requirements:
  * Should have no class when there's no change available
  * Should have the class ‘increasing’ when the change is positive
  * Should have the class 'decreasing' when the change is negative
  * Change should be expressed as a percent change from the last price, to one decimal place
* Think-pair-share: Once the price updates, how can we calculate the change from the last price?

# Iteration #4
**Implement the price history graph**
* Requirements:
  * the lowest price in the graph must have a CSS height of 10%
  * the highest price in the graph must have a CSS height of 100%
* Think-pair-share your approach

# Iteration #5
**Autosize the price history graph**
* Requirements:
  * Show only as many bars as you have room for in the price history graph
  * Make sure this is resilient when the user resizes the window horizontally
* Think-pair-share your approach

# Iteration #6
**Implement the trend indicator**
* Requirements:
  * Should have no class when there's no trend available
  * Should have the class ‘increasing’ when the trend is positive
  * Should have the class 'decreasing' when the trend is negative
  * Calculate the trend however you like, as a percent to one decimal place

Note: If you're mathematically inclined, feel free to calculate the trend properly. For expediency, however, something as simple as an average of the last 10 changes (once 11 prices are available) will do.

# Iteration #7
**Implement the security sorter**
* Requirements:
  * Should be able to sort the securities by name, ascending and descending
  * Should be able to sort the securities by price, ascending and descending

# Iteration #8
**Implement the portfolio section**
* Requirements:
  * display your actual cash holdings
  * securities should be sorted by symbol
  * the text input must only accept the digits 0-9, and you can't lead with a zero
  * buy/sell buttons must be disabled unless the number of units > 0
  * buy button must be disabled if you have insufficient funds to buy that many units at current prices
  * sell button must be disabled if you hold insufficient units to sell that many
  * buy button must execute the RJSDAQ.buy(symbol, units, cb) method, and disable the form until the callback has been called
  * sell button must execute the RJSDAQ.sell(symbol, units, cb) method, and disable the form until the callback has been called
  * blank out the input after buying or selling
  * if the server returns errors, pop them up in an alert

# Iteration #9
**Implement the Go Public section**
* Requirements:
  * the symbol text input must allow no more than 3 letters, and should uppercase them as you type
  * the submit button must be disabled unless a 3 letter symbol and a name have been provided
  * go public button must execute the RJSDAQ.goPublic(symbol, name, cb) method, and disable the form until the callback has been called
  * if the server returns errors, pop them up in an alert