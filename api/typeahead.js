var key = require('../utils/key');
var sync = require('synchronize');
var request = require('request');
var _ = require('underscore');


// The Type Ahead API.
module.exports = function(req, res) {
  var term = req.query.text.trim();
  if (!term) {
    res.json([{
      title: '<i>(enter a search term)</i>',
      text: ''
    }]);
    return;
  }

  var response;
  try {
    console.log(term);
    response = sync.await(request({
      url: 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20(%22'+term+'%22)&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=',
      gzip: true,
      json: true,
      timeout: 10 * 1000
    }, sync.defer()));
  } catch (e) {
    console.log(e);
    res.status(500).send('Error');
    return;
  }

  var quote = response.body.query.results.quote;



if(quote.Name) {
  var results =  {
        title: '<i> '+ quote.Name+'('+term+')'+'. . . . . . . . . . .'+quote.LastTradePriceOnly+'('+quote.Change_PercentChange+')'+ '</i>', 
        text: term
      };
      console.log(response.body.query.results);

  res.json([results]);

  } 
   else{
    res.json([{
      title: '<i>(no result)</i>',
      text: ''
    }]);

}


  
};
