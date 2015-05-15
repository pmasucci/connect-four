#Connect Four
The classic Connect Four game from your childhood. There is a 6x7 board that players can place chips into. The first player to get 4 consecutive chips in a row, column, or diagonally is the winner.


###Built With
Connect Four was built using jQuery, Twitter Bootstrap, and pure CSS animations.

###Features
* Column highlight on hover
* Pieces drop in from the top of the board
* Reset Game button drops pieces out from bottom just like in real life! (Although the button is disabled until someone wins or there is a tie so your little brother can't just dump the pieces whenever he feels like it)
* Players can win with four in a row, column or diagonal
  * Rows and columns are concatenated using `.join('')` and then a win is searched for using `.match(/b{4}|r{4})`
* Funny messages for the losing party (ripped directly from the Worms series of games)

###Play!
[Play on firebase](https://connect-four-pm.firebaseapp.com/)
