
module.exports = function (pendingOffers) {

  var botOffers = this.botOffers,
      log       = this.log,
      Stem      = this;

  if (!pendingOffers)
    return;

  botOffers.getOffers({ get_received_offers: 1, active_only: 1 }, function (err, activeOffers) {

    if (err)
      return log.error('[Storage]', err.message);

    if (!activeOffers || !activeOffers.response.trade_offers_received)
      return;

    activeOffers.response.trade_offers_received.forEach(function (offer) {

      if (offer.trade_offer_state !== 2)
        return;

      var bot              = Stem.bot,
          isOfferFromAdmin = Stem.api.isAdmin(offer.steamid_other),
          alertAdmins      = Stem.config['stem-storage'].alertAdmins;

      if (!isOfferFromAdmin) {

        log.info('[Storage] Declining trade offer from', offer.steamid_other);

        if (alertAdmins) {

          Stem.config.admins.forEach(function (admin) {

            bot.sendMessage(admin, 'Declined trade offer from http://steamcommunity.com/profiles/' + offer.steamid_other);

          });

        }

        return botOffers.declineOffer(offer.tradeofferid);

      }

      log.info('[Storage] Accepting trade offer from', offer.steamid_other);

      if (alertAdmins) {

        Stem.config.admins.forEach(function (admin) {

          bot.sendMessage(admin, 'Accepted trade offer from http://steamcommunity.com/profiles/' + offer.steamid_other);

        });

      }

      return botOffers.acceptOffer(offer.tradeofferid);

    });

  });

};
