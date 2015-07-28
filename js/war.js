(function () {
  'use strict';

  var _this;

  var War = {

    init: function (params) {

      // cache object reference
      _this = this;
      _this.params = params;

      // cache DOM elements
      _this.$dealer = $('.dealer-cards');
      _this.$player = $('.player-cards');
      _this.$controls = $('.player-controls');

      // set up cards
      _this.ranks = ['a', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'j', 'q', 'k'];
      _this.suits = ['c', 'd', 'h', 's'];

      // bind DOM events
      _this.bindDOMEvents();

      // generate cards
      _this.updateCards();
    },

    bindDOMEvents: function () {

      $('.play-round', _this.$controls)
        .off('click')
        .on('click', function (e) {
          e.preventDefault();
        });
    },

    updateCards: function () {
      _this.makeDecks(_this.params.deck_count);
      _this.shuffleDecks(_this.params.shuffle_count);
    },

    makeDecks: function (decks) {
      _this.cards = [];

      // loop through decks
      for (var d = 0; d < decks; d++) {

        // loop through ranks
        for (var r = 0; r < _this.ranks.length; r++) {

          // loop through suits
          for (var s = 0; s < _this.suits.length; s++) {
            var card = '' + _this.ranks[r] + _this.suits[s];
            _this.cards.push(card);
          }
        }
      }
    },

    shuffleDecks: function (shuffles) {
      var cLength = _this.cards.length;

      // loop through shuffles
      for (var s = 0; s < shuffles; s++) {

        // loop through cards
        for (var c = 0; c < cLength; c++) {
          var card = _this.cards[c];
          var r = Math.floor(Math.random() * cLength);

          _this.cards[c] = _this.cards[r];
          _this.cards[r] = card;
        }
      }
    },
  };

  War.init({ deck_count: 5, shuffle_count: 10 });
})();
