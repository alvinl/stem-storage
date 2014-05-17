
module.exports = function (pendingOffers) {

  var botOffers = this.botOffers,
      log       = this.log,
      Stem      = this;
  
  if (!pendingOffers) return;

  botOffers.getOffers({ get_received_offers: 1, active_only: 1 }, function (err, activeOffers) {
    
    if (err) return log.error('[stem-storage] ', err.message);

    if (activeOffers.response.trade_offers_received) {

      activeOffers.response.trade_offers_received.forEach(function (offer) {
        
        if (offer.trade_offer_state !== 2) return;

        var bot              = Stem.bot,
            isOfferFromAdmin = Stem.utils.isAdmin(offer.steamid_other),
            alertAdmins      = Stem.configs['stem-storage'].alertAdmins;

        if (isOfferFromAdmin) {

          log.info('[stem-storage] Accepting trade offer from', offer.steamid_other);

          if (alertAdmins) {

            Stem.config.admins.forEach(function (admin) {
              
              bot.sendMessage(admin, 'Accepted trade offer from http://steamcommunity.com/profiles/' + offer.steamid_other);

            });

          }

          botOffers.acceptOffer(offer.tradeofferid);

        }

        else {

          log.info('[stem-storage] Declining trade offer from', offer.steamid_other);

          if (alertAdmins) {

            Stem.config.admins.forEach(function (admin) {
              
              bot.sendMessage(admin, 'Declined trade offer from http://steamcommunity.com/profiles/' + offer.steamid_other);

            });

          }

          botOffers.declineOffer(offer.tradeofferid);

        }

      });

    }

  });

};