
module.exports = function (Stem) {

  Stem.api.addHandler('bot', 'tradeOffers', require('./tradeOffers'));
  
};