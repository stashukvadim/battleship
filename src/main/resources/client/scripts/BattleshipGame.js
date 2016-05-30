//------------------------------------
// Constants
//------------------------------------
var EXTENSION_NAME = "battleship";
var BOARD_SIZE = 300;
var BOARD_BORDER = 8;
var PIECE_SIZE = 36;
var FPS = 40;

//------------------------------------
// Vars
//------------------------------------
var inited = false;
var canvas;
var stage;
var board;
var squares = [];

var p1NameCont;
var p2NameCont;

var statusTF;

var disabler;
var currentPopUp;

var gameStarted = false;
var iAmSpectator = false;

var whoseTurn;
var player1Id;
var player2Id;
var player1Name;
var player2Name;

/**
 * Initialize the game
 */
function initGame() {
    if (inited == false) {
        inited = true;

        //Stage
        canvas = document.getElementById("gameContainer");
        stage = new createjs.Stage(canvas);
        stage.mouseEventsEnabled = true;

        //Ticker
        createjs.Ticker.setFPS(FPS);

        //Board
        //buildGameUI();
    }

    createjs.Ticker.addListener(tick);

    gameStarted = false;

    // Register to SmartFox events
    sfs.addEventListener(SFS2X.SFSEvent.EXTENSION_RESPONSE, onExtensionResponse);
    sfs.addEventListener(SFS2X.SFSEvent.SPECTATOR_TO_PLAYER, onSpectatorToPlayer);

    $(".board").show();

}

function sendReady() {
    // Tell extension I'm ready to play
    console.log("Send ready button clicked");
    sfs.send(new SFS2X.Requests.System.ExtensionRequest("ready", {}, sfs.lastJoinedRoom))
}

/**
 * Update the canvas
 */
function tick() {
    stage.update();
}

/**
 * Destroy the game instance
 */
function destroyGame() {
    sfs.removeEventListener(SFS2X.SFSEvent.EXTENSION_RESPONSE, onExtensionResponse);
    sfs.removeEventListener(SFS2X.SFSEvent.SPECTATOR_TO_PLAYER, onSpectatorToPlayer);

    //Remove PopUp
    removeGamePopUp();
}

/**
 * Start the game
 */
function startGame(params) {
    whoseTurn = params.t;
    player1Id = params.p1i;
    player2Id = params.p2i;
    player1Name = params.p1n;
    player2Name = params.p2n;

    // Reset the game board
    //resetGameBoard();

    // Remove the "waiting for other player..." popup
    //removeGamePopUp();

    p1NameCont.name.text = player1Name;
    p2NameCont.name.text = player2Name;

    setTurn();
    enableBoard(true);

    gameStarted = true;

    //My func
    disablePlayerBoard();
    activateEnemyBoard();
}

/**
 * Set the "Player's turn" status message
 */
function setTurn() {
    if (iAmSpectator == false) {
        statusTF.text = (sfs.mySelf.getPlayerId(sfs.lastJoinedRoom) == whoseTurn) ? "It's your turn" : "It's your opponent's turn";
    } else {
        statusTF.text = "It's " + this["player" + whoseTurn + "Name"] + " turn";
    }
}



/**
 * Declare game winner
 */
function showWinner(cmd, params) {
    gameStarted = false;
    statusTF.text = "";
    var message = "";

    if (cmd == "win") {
        if (iAmSpectator == true) {
            var pName = this["player" + params.w + "Name"];
            message = pName + " is the WINNER";
        }
        else {
            if (sfs.mySelf.getPlayerId(sfs.lastJoinedRoom) == params.w) {
                // I WON! In the next match, it will be my turn first
                message = "You are the WINNER!"
            }
            else {
                // I've LOST! Next match I will be the second to move
                message = "Sorry, you've LOST!"
            }
        }
    }
    else if (cmd == "tie") {
        message = "It's a TIE!"
    }

    // Show "winner" message
    if (iAmSpectator == true) {
        showGamePopUp("endSpec", message);
    } else {
        showGamePopUp("end", message);
    }
}

/**
 * Restart the game
 */
function restartGame() {
    removeGamePopUp();

    sfs.send(new SFS2X.Requests.System.ExtensionRequest("restart", {}, sfs.lastJoinedRoom))
}

/**
 * One of the players left the game
 */
function userLeft() {
    gameStarted = false;
    statusTF.text = "";
    var message = "";

    // Show "wait" message
    if (iAmSpectator == false) {
        message = "Your opponent left the game" + "<br/><br/>" + "Waiting for a new player";
        showGamePopUp("wait", message);
    } else {
        message = "A player left the game" + "<br/><br/>" + "Press the Join button to play";
        showGamePopUp("waitSpec", message);
    }
}

/**
 * Spectator receives board update. If match isn't started yet,
 * a message is displayed and he can click the join button
 */
function setSpectatorBoard(params) {
    removeGamePopUp();

    whoseTurn = params.t;
    player1Id = params.p1i;
    player2Id = params.p2i;
    player1Name = params.p1n;
    player2Name = params.p2n;

    gameStarted = params.status;

    p1NameCont.name.text = player1Name;
    p2NameCont.name.text = player2Name;

    if (gameStarted == true)
        setTurn();

    var boardData = params.board;

    for (var y = 0; y < boardData.length; y++) {
        var boardRow = boardData[y];
        for (var x = 0; x < boardRow.length; x++) {
            var square = squares[y * 3 + x];
            square.ball.gotoAndStop(boardRow[x]);
        }
    }

    if (gameStarted == false) {
        var message = "Waiting for game to start" + "<br/><br/>" + "Press the Join button to play";
        showGamePopUp("waitSpec", message);
    }
}

/**
 * If a spectator enters the game room and the match isn't started yet,
 * he can click the join button
 */
function spectatorJoinGame() {
    sfs.send(new SFS2X.Requests.System.SpectatorToPlayerRequest());
}

//------------------------------------
// Game Popup
//------------------------------------
/**
 * Show the Game PopUp
 */
function showGamePopUp(id, message) {
    if (currentPopUp != undefined)
        removeGamePopUp();

    disabler.visible = true;

    currentPopUp = $("#" + id + "GameWin");

    currentPopUp.jqxWindow("open");
    currentPopUp.jqxWindow("move", (canvas.width / 2) - (currentPopUp.jqxWindow("width") / 2) + canvas.offsetLeft, (canvas.height / 2) - (currentPopUp.jqxWindow("height") / 2) + canvas.offsetTop);
    currentPopUp.children(".content").children("#firstRow").children("#message").html(message);
}

/**
 * Hide the Game PopUp
 */
function removeGamePopUp() {
    if (currentPopUp != undefined) {
        disabler.visible = false;

        currentPopUp.jqxWindow("close");
        currentPopUp = undefined;
    }
}

//------------------------------------
// SFS EVENT HANDLERS
//------------------------------------

function onExtensionResponse(evt) {
    var params = evt.params;
    var cmd = evt.cmd;

    console.log("> Received Extension Response: " + cmd);

    switch (cmd) {
        case "start":
            startGame(params);
            console.log("Let the game begin!!!");
            break;
        case "stop":
            userLeft();
            break;
        case "move":
            moveReceived(params);
            break;
        case "specStatus":
            setSpectatorBoard(params);
            break;
        case "win":
        case "tie":
            showWinner(cmd, params);
            break;
        case "boardsUpdate":
            updateBoards(params);
            break;
        case "gameOver" :
            gameOver(params);
    }
}

function printBoard(boardArr) {
    var arrayFromParam = boardArr.board;
    console.log("arrayFromParam = " + arrayFromParam);
    console.log("arrayFromParam.length = " + arrayFromParam.length);
    updateBoard(arrayFromParam);
}


function onSpectatorToPlayer(evt) {
    var updatedUser = evt.user;

    if (updatedUser.isItMe) {
        iAmSpectator = false;

        // Show "wait" message
        removeGamePopUp();
        var message = "Waiting for player " + ((sfs.mySelf.getPlayerId(sfs.lastJoinedRoom) == 1) ? "2" : "1");
        showGamePopUp("wait", message)
    }
}