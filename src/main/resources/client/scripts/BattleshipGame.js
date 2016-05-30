var FPS = 40;

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
 * Restart the game
 */
function restartGame() {
    removeGamePopUp();

    sfs.send(new SFS2X.Requests.System.ExtensionRequest("restart", {}, sfs.lastJoinedRoom))
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