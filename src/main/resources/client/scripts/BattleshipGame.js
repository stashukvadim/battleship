var disabler;
var currentPopUp;

function initGame() {
    sfs.addEventListener(SFS2X.SFSEvent.EXTENSION_RESPONSE, onExtensionResponse);
    showBoards();
    $("#gamebox").hide();
    $("#leaveGameBt").show();
}

function sendReady() {
    console.log("Send ready button clicked");
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

function onExtensionResponse(evt) {
    var params = evt.params;
    var cmd = evt.cmd;

    console.log("Received Extension Response: " + params + " command = " + cmd);

    switch (cmd) {
        case "start":
            startGame(params);
            console.log("Let the game begin!!!");
            break;
        case "boardsUpdate":
            updateBoards(params);
            break;
        case "gameOver" :
            gameOver(params);
            break;
        case "boardCheckResult" :
            handleBoardCheckResult(params);
            break;
    }
}