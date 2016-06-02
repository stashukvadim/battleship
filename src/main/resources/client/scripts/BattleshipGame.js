var disabler;
var currentPopUp;

function initGame() {
    sfs.removeEventListener(SFS2X.SFSEvent.EXTENSION_RESPONSE, onExtensionResponse);
    sfs.addEventListener(SFS2X.SFSEvent.EXTENSION_RESPONSE, onExtensionResponse, this);
    showBoards();

    hide(cons.GAME_BOX);
    show(cons.INFO_BOX);
    show(cons.LEAVE_GAME_BT);
    show(cons.PUT_DEFAULT_SHIPS_BUTTON);
    info("Please add ships.");
}

function sendReady() {
    log("Send ready button clicked");
    sfs.send(new SFS2X.Requests.System.ExtensionRequest("ready", {}, sfs.lastJoinedRoom))
}

function startGame(params) {
    disablePlayerBoard();
    activateEnemyBoard();
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

function log(message) {
    console.log(message);
}

function onExtensionResponse(evt) {
    var params = evt.params;
    var cmd = evt.cmd;

    log("Received Extension Response: " + params + " command = " + cmd);

    switch (cmd) {
        case servResp.START:
            startGame(params);
            trace("Let the game begin!!!", true);
            break;
        case servResp.BOARDS_UPDATE:
            updateBoards(params);
            break;
        case servResp.GAME_OVER :
            gameOver(params);
            info('Game Over!');
            break;
        case servResp.BOARD_CHECK_RESULT :
            handleBoardCheckResult(params);
            break;
        case servResp.OPPONENT_LEFT:
            handleOpponentLeft();
            break;
    }
}