var boardCells = [];
var enemyBoardCells = [];
var countCells = 0;


function addCell(id) {
    countCells++;
    boardCells[id] = 1;
    addCellRemoveHandler(id);
    updateBoardsColor();
    if (countCells == 20) {
        alert("All ships set! Sending data to server!");
        disableAddingShips();
        console.log("boardCells = " + boardCells);
        sfs.send(new SFS2X.Requests.System.ExtensionRequest("sendBoard", {board: boardCells}, sfs.lastJoinedRoom));
    }
}

function handleBoardCheckResult(params) {
    var boardCorrect = params.boardCorrect;
    console.log("boardCorrect = " + boardCorrect);
    if (!boardCorrect) {
        alert("Board is incorrect! Change ships!")
    }
    else {
        alert("Board is correct!");
        disablePlayerBoard();
    }
}

function addCellRemoveHandler(id) {
    $("#" + id).off('click').on("click", function (event) {
        var cellId = event.target.id;
        removeCell(cellId);
    });
}

function addCellAddHandler(id) {
    $("#" + id).on("click", function (event) {
        var cellId = event.target.id;
        addCell(cellId);
    });
}


function disableAddingShips() {
    console.log("disableAddingShips()");
    for (var i = 0; i < 100; i++) {
        var cellState = boardCells[i];
        if (cellState == 0) {
            disableCellHandler(i);
        }
    }
}

function disableCellHandler(id) {
    $("#" + id).off("click");
}

function removeCell(id) {
    countCells--;
    if (countCells == 19) {
        allowAddingShips();
    }
    boardCells[id] = 0;
    $("#" + id).off('click').on("click", function (event) {
        var cellId = event.target.id;
        addCell(cellId);
    });
    updateBoardsColor();
}

function allowAddingShips() {
    activatePlayerBoard();
}

function disablePlayerBoard() {
    $(".userTd").off('click');
}

function activateEnemyBoard() {
    disableEnemyBoard();
    $("#enemyTable").css("border", "2px solid black");
    $(".enemyTd").on("click", function (event) {
        var cellId = event.target.id;
        fire(cellId);
    })
}

function disableEnemyBoard() {
    $(".enemyTd").off('click');
    $("#enemyTable").css("border", "2px solid red");
}

function showBoards() {
    $(".board").show();
}

function hideBoards() {
    $(".board").hide();
}

function fire(id) {
    console.log("fire() is send for cellId = " + id);
    console.log("sfs.lastJoinedRoom = " + sfs.lastJoinedRoom);
    sfs.send(new SFS2X.Requests.System.ExtensionRequest("fire", {cellId: id}, sfs.lastJoinedRoom));
}


function onSetShipCellClick(id) {
    sfs.send(new SFS2X.Requests.System.ExtensionRequest("setShipCell", {cellId: id}, sfs.lastJoinedRoom));
}

function colorForNumber(num) {
    var color;
    switch (num) {
        case 0 :
            color = '#99e6ff';
            break;
        case -1:
            color = '#ffff99';
            break;
        case 1:
            color = '#88cc00';
            break;
        case 2 :
            color = '#ff3333';
            break;
        case -2:
            color = '#808080'
    }
    return color;
}

function updateBoard(array, isEnemyBoard) {
    var boardArr = isEnemyBoard ? enemyBoardCells : boardCells;
    for (var i = 0; i < 100; i++) {
        boardArr[i] = array[i];
    }
}

function updateBoards(params) {
    var isYourTurn = params.isYourTurn;
    handleTurn(isYourTurn);
    updateBoard(params.board);
    updateBoard(params.enemyBoard, true);
    updateBoardsColor();
}

function updateBoardsColor() {
    console.log("trace: updateBoardsColor()");

    for (var i = 0; i < 100; i++) {
        var selector = '#' + i;
        var enemySelector = '#e' + i;
        var cellColor = colorForNumber(boardCells[i]);
        $(selector).css('background-color', cellColor);
        var enemyCellColor = colorForNumber(enemyBoardCells[i]);
        $(enemySelector).css('background-color', enemyCellColor);
    }
}

function handleTurn(isYourTurn) {
    console.log("isYourTurn = " + isYourTurn);
    if (isYourTurn) {
        activateEnemyBoard();
    }
    else {
        disableEnemyBoard();
    }
}

function gameOver(params) {
    alert("Game Over!!!")
}

function destroyGame() {
    hideBoards();
    boardCells = [];
    enemyBoardCells = [];
    countCells = 0;
    hide("#leaveGameBt");
    hide("#putDefault");
}

function hide(selector) {
    $(selector).hide();
}
function putDefaultShips() {
    boardCells = [
        1, 1, 1, 1, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 1, 0, 0, 1, 0,
        1, 1, 1, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        1, 1, 1, 0, 0, 0, 0, 1, 0, 0,
        0, 0, 0, 0, 0, 1, 0, 0, 0, 0,
        1, 1, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        1, 1, 0, 0, 1, 1, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    countCells = 19;
    addCell(0);
}

