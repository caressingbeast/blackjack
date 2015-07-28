(function () {
  'use strict';

  var _this;

  var Blackjack = {

    init: function () {

      // cache object reference
      _this = this;

      // cache DOM elements
      _this.$dealer = $('.dealer-cards');
      _this.$player = $('.player-cards');

      // set up cards
      _this.ranks = ['a', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'j', 'q', 'k'];
      _this.suits = ['c', 'd', 'h', 's'];

      _this.makeDecks(6);
      _this.shuffleDecks();
    },

    makeDecks: function (count) {
      var m = _this.ranks.length * _this.suits.length;
      console.log(count, m);
    }
  };

  Blackjack.init();
})();
