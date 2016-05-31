function initPlayerBoard() {
    console.log("initPlayerBoard()");
    boardCells = [];
    countCells = 0;
    for (var i = 0; i < 100; i++) {
        boardCells.push(0);
    }
    updateBoardsColor();
    activatePlayerBoard();
}

function activatePlayerBoard() {
    console.log("in activatePlayerBoard");
    disablePlayerBoard();
    for (var i = 0; i < 100; i++) {
        var cellState = boardCells[i];
        if (cellState == 0) {
            addCellAddHandler(i);
        }
        else if (cellState == 1) {
            addCellRemoveHandler(i);
        }
    }
}