(function () {
  'use strict';

  var _this;

  var War = {

    init: function () {

      // cache object reference
      _this = this;
      _this.timeout;

      // keep track of cards
      _this.table = {
        dealer: [],
        player: []
      };

      _this.cards = [];
      _this.dealer = [];
      _this.player = [];

      // cache DOM elements
      _this.$outcome = $('.outcome');
      _this.$dealer = $('.dealer-cards .dealt-cards');
      _this.$player = $('.player-cards .dealt-cards');
      _this.$dealerCount = $('.dealer-cards .card-count');
      _this.$playerCount = $('.player-cards .card-count');
      _this.$controls = $('.directions');
      _this.$template = Handlebars.compile($('#card-tmpl').html());
      _this.$warTemplate = Handlebars.compile($('#battle-tmpl').html());

      // set up cards
      _this.ranks = ['a', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'j', 'q', 'k'];
      _this.suits = ['c', 'd', 'h', 's'];

      // generate, shuffle, and split a deck
      _this.generateDeck(1);
      _this.shuffleDeck(10);
      _this.splitDeck();

      // DOM stuff
      $('.table').show();
      _this.$controls.find('.start-game').hide();
      _this.$controls.find('.hidden-btns').show();
      _this.updateRemainingCount();

      // bind DOM events
      _this.bindDOMEvents();
    },

    generateDeck: function (decks) {
      for (var d = 0; d < decks; d++) { // loop through decks
        for (var r = 0; r < _this.ranks.length; r++) { // loop through ranks
          for (var s = 0; s < _this.suits.length; s++) { // loop through suits
            var card = { rank: _this.ranks[r], suit: _this.suits[s] };
            _this.cards.push(card);
          }
        }
      }
    },

    shuffleDeck: function (shuffles) {
      var cLength = _this.cards.length;

      for (var s = 0; s < shuffles; s++) { // loop through shuffles
        for (var c = 0; c < cLength; c++) { // loop through cards
          var card = _this.cards[c];
          var r = Math.floor(Math.random() * cLength);
          _this.cards[c] = _this.cards[r];
          _this.cards[r] = card;
        }
      }
    },

    splitDeck: function () {
      var dealer = false;
      var player = true;

      for (var i = 0; i < _this.cards.length; i++) {

        if (player) {
          _this.player.push(_this.cards[i]);
          dealer = !dealer;
          player = !player;
        } else {
          _this.dealer.push(_this.cards[i]);
          dealer = !dealer;
          player = !player;
        }
      }
    },

    updateRemainingCount: function () {
      _this.$dealerCount.text(_this.dealer.length);
      _this.$playerCount.text(_this.player.length);
    },

    bindDOMEvents: function () {

      $('.play-round', _this.$controls)
        .off('click')
        .on('click', function () {
          _this.playRound();
        });

      $('.clear-table', _this.$controls)
        .off('click')
        .on('click', function () {
          _this.clearTable();
        });

      $('.begin-battle', _this.$controls)
        .off('click')
        .on('click', function () {
          _this.battle();
        });
    },

    playRound: function () {

      // output dealer info
      var dCard = _this.dealer.shift();
      _this.table.dealer.push(dCard);
      _this.$dealer.html(_this.$template(dCard));

      // output player info
      var pCard = _this.player.shift();
      _this.table.player.push(pCard);
      _this.$player.html(_this.$template(pCard));

      // update remaining card count
      _this.updateRemainingCount();

      // score round
      _this.scoreRound();
    },

    scoreRound: function () {
      var dScore = _this.getScore(_this.table.dealer.slice(-1)[0]);
      var pScore = _this.getScore(_this.table.player.slice(-1)[0]);
      var winnings = [];

      if (dScore === pScore) {
        _this.flashOutcome('WAR!!!111!!!');
        _this.updateActiveButtons(2);
        return;
      }

      // update winnings
      winnings = $.merge(_this.table.player, _this.table.dealer);

      if (dScore > pScore) {
        _this.dealer = $.merge(_this.dealer, winnings);
        _this.flashOutcome('Dealer won!');
      } else {
        _this.player = $.merge(_this.player, winnings);
        _this.flashOutcome('You won!');
      }

      _this.updateActiveButtons(1);
    },

    getScore: function (actor) {
      var score;

      switch (actor.rank) {
        case 'a':
          score = 11;
          break;

        case 'j':
        case 'q':
        case 'k':
          score = 10;
          break;

        default:
          score = actor.rank;
          break;
      }

      return score;
    },

    battle: function () {
      var dealer = _this.dealer.splice(0, 4);
      var player = _this.player.splice(0, 4);

      // merge cards into table cards
      _this.table.dealer = $.merge(_this.table.dealer, dealer);
      _this.table.player = $.merge(_this.table.player, player);

      // show cards
      _this.$dealer.append(_this.$warTemplate(dealer.slice(-1)[0]));
      _this.$player.append(_this.$warTemplate(player.slice(-1)[0]));

      // update remaining card count
      _this.updateRemainingCount();

      // score round
      _this.scoreRound();
    },

    updateActiveButtons: function (index) {
      var buttons = [
        _this.$controls.find('.play-round'),
        _this.$controls.find('.clear-table'),
        _this.$controls.find('.begin-battle')
      ];

      _this.$controls.find('button').attr('disabled', true);
      buttons[index].removeAttr('disabled');
    },

    flashOutcome: function (outcome) {
      _this.$outcome.text(outcome).show().stop(true, true);
      _this.$outcome.fadeOut(2000, function () {
        _this.$outcome.hide();
      });
    },

    clearTable: function () {

      // clear table arrays
      _this.table.dealer = [];
      _this.table.player = [];

      // clear DOM
      _this.$dealer.empty();
      _this.$player.empty();

      // update remaining card count
      _this.updateRemainingCount();

      // update buttons
      _this.updateActiveButtons(0);
    }
  };

  $(document).on('click', '.start-game', function () {
    War.init();
  });
})();
