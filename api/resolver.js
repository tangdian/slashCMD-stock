var key = require('../utils/key');
var sync = require('synchronize');
var request = require('request');
var _ = require('underscore');


// The API that returns the in-email representation.
module.exports = function(req, res) {
  var term = req.query.text.trim();
    handleSearchString(term, req, res);
  } ;

function handleSearchString(term, req, res) {
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
  var html;
  // if price rise then green, otherwise red
  if(quote.Change<0){

    html= '<a  style=" color:#8A2BE2;text-decoration: none;" href='+'http://finance.yahoo.com/q?s='
  +term+'><table style="max-width:600px;border:solid 1px;border-radius:10px;"><tr><td>\
    <h2>'+ quote.Name+'<span style="font-size:0.7em"> ('+term+')</span> <span style="font-size:0.5em">'+quote.LastTradeDate+'   '+quote.LastTradeTime+'</span></h2>\
    </td>\
    <td>\
    <h2 style="color:red">'+quote.LastTradePriceOnly+'<span style="font-size:0.7em ">('+quote.Change_PercentChange+')</span></h2> \
    </tr>\
    </table></a>';
    }

else {
  html= '<a  style="color:#8A2BE2; text-decoration: none;" href='+'http://finance.yahoo.com/q?s='
      +term+'><table style="max-width:900px;border:solid 1px;border-radius:10px;"><tr><td>\
    <h2>'+ quote.Name+'<span style="font-size:0.7em"> ('+term+')</span> <span style="font-size:0.5em">'+quote.LastTradeDate+'   '+quote.LastTradeTime+'</span></h2>\
    </td>\
    <td>\
    <h2 style="color:green">'+quote.LastTradePriceOnly+'<span style="font-size:0.7em ">('+quote.Change_PercentChange+')</span></h2> \
    </td>\
    </tr>\
    </table></a>';
    }



  res.json({
    body: html
    // Add raw:true if you're returning content that you want the user to be able to edit
  });
}