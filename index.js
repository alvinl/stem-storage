
module.exports = function (Stem) {

  var bot = Stem.bot;

  Stem.api.addHandler(bot, 'tradeOffers', require('./tradeOffers'));
  
};