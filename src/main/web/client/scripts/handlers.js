function startGame(params) {
    disablePlayerBoard();
    activateEnemyBoard();
    hide(cons.PUT_DEFAULT_SHIPS_BUTTON);
    trace("Let the game begin!!!", true);
}

function updateBoards(params) {
    var isYourTurn = params.isYourTurn;
    handleTurn(isYourTurn);
    updateBoard(params.board);
    updateBoard(params.enemyBoard, true);
    updateBoardsColor();
}

function gameOver(params) {
    info('Game Over!');
    disableEnemyBoard();
}

function handleBoardCheckResult(params) {
    var boardCorrect = params.boardCorrect;
    trace("boardCorrect = " + boardCorrect);
    if (!boardCorrect) {
        alert("Board is incorrect! Change ships!")
    }
    else {
        info("Waiting for another player");
        disablePlayerBoard();
    }
}

function handleOpponentLeft() {
    info("Your opponent left the game :(");
    gameOver();
}
