
module.exports = function (Stem) {

  var bot = Stem.bot;

  Stem.utils.addHandler(bot, 'tradeOffers', require('./tradeOffers'));
  
};