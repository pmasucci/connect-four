var players = ['b', 'r'];
var player = 0;
var gameWon = false;
var playerScore = [0,0]
board = {
  cols: {},
  rows: {}
};

$(document).ready(function() {

  $('#restart').click(function() {
    $('.chip').addClass('drop');
    setTimeout(function() {
      $('.chip').remove();
    }, 500);
    $('.hole').addClass('empty');
    $('#restart').prop('disabled', true);

    board = {
      cols: {},
      rows: {}
    };
    gameWon = false;
  });

  $('.col-xs-1').click(function() {
    if (validMove(this) && !gameWon) {
      displayChip(player, this);
      storeChip(player, this);

      gameWon = checkWinner();
      if (gameWon) {
        $('#restart').prop('disabled', false);
        playerScore[player]++;
        $('.' + players[player] + 'score').text(playerScore[player]);
      }

      player = 1 - player;



    }
  });

  function displayChip(player, column) {
    column = $(column);
    lastEmpty = column.find('.empty').last();
    lastEmpty.html('<div class="chip ' + players[player] + '" ></div>');
    lastEmpty.removeClass('empty');

  }

  function validMove(column) {
    var ret = false;
    column = $(column).attr('id').substring(3);
    if (board.cols[column] === undefined || board.cols[column].length < 6) {
      ret = true;
    }
    return ret;
  }

  function storeChip(player, column) {
    column = $(column).attr('id').substring(3);
    if (board.cols[column]) {
      board.cols[column].push(players[player]);
    } else {
      board.cols[column] = [players[player]];
    }

    row = (board.cols[column].length - 1);

    if (board.rows[row]) {
      board.rows[row][column] = players[player];
    } else {
      board.rows[row] = [' ', ' ', ' ', ' ', ' ', ' '];
      board.rows[row][column] = players[player];
    }


  }

  //only checks rows and cols for now. No diags.
  function checkWinner() {
    //gives me each column and row.
    //Gonna build a string with all the r/b values
    for (var col in board.cols) {
      var rDiag = '';
      var lDiag = '';
      var rCDiag = '';
      var lCDiag = '';

      //Check Right Moving diags
      for (var i = 0; board.cols[col] && board.cols[parseInt(col) + i] && col < 4; i++) {
        rDiag += board.cols[i + parseInt(col)][i];

      }

      if (rDiag.match(/b{4}|r{4}/)) {
        return true;
      }
      //----------
      // Check Left moving diags
      for (i = 0; board.cols[col] && board.cols[parseInt(col) - i] && col > 2; i++) {
        lDiag += board.cols[parseInt(col) - i][i];

      }

      if (lDiag.match(/b{4}|r{4}/)) {
        return true;
      }
      //--------------

      //check diags up left side
      for (var j = 0; j < 2; j++) {
        rCDiag = '';
        for (i = 1; board.cols[0] && board.cols[i - 1] && board.cols[i - 1].length && col === '0'; i++) {
          rCDiag += board.cols[i - 1][i + j];
        }
        if (rCDiag.match(/b{4}|r{4}/)) {
          return true;
        }
      }

      //----------
      //check diags up right side
      for (j = 0; j < 2; j++) {
        lCDiag = '';
        for (i = 1; board.cols[6] && board.cols[7 - i] && board.cols[7 - i].length && col === '6'; i++) {
          lCDiag += board.cols[7 - i][i + j];

        }
        if (lCDiag.match(/b{4}|r{4}/)) {
          console.log("Pack it up, you win.");
          return true;
        }


      }
      if (board.cols[col].join('').match(/b{4}|r{4}/)) {
        return true;
      }
    }

    for (var row in board.rows) {
      if (board.rows[row].join('').match(/b{4}|r{4}/)) {
        return true;
      }

    }
  }

});
