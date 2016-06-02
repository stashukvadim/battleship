var boardCells = [];
var enemyBoardCells = [];
var countCells = 0;


function addCell(id) {
    countCells++;
    boardCells[id] = 1;
    addCellRemoveHandler(id);
    updateBoardsColor();
    if (countCells == 20) {
        trace("All ships set! Sending data to server!");
        disableAddingShips();
        trace("boardCells = " + boardCells);
        sfs.send(new SFS2X.Requests.System.ExtensionRequest(clientReq.SEND_BOARD, {board: boardCells}, sfs.lastJoinedRoom));
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
    trace("disableAddingShips()");
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
        fire(parseInt(cellId.substring(1)));
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
    trace("fire() is send for cellId = " + id);
    sfs.send(new SFS2X.Requests.System.ExtensionRequest(clientReq.FIRE, {cellId: id}, sfs.lastJoinedRoom));
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

function updateBoardsColor() {
    trace("trace: updateBoardsColor()");

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
    trace("isYourTurn = " + isYourTurn);
    if (isYourTurn) {
        activateEnemyBoard();
        info("Your turn");
    }
    else {
        disableEnemyBoard();
        info("You opponent's turn");
    }
}

function destroyGame() {
    hideBoards();
    boardCells = [];
    enemyBoardCells = [];
    countCells = 0;
    trace("in destroyGame()");
    trace("boardCells = " + boardCells);
    trace("enemyBoardCells = " + enemyBoardCells);
    trace("countCells = " + countCells);
    hide(cons.LEAVE_GAME_BT);
    hide(cons.INFO_BOX);
    hide(cons.PUT_DEFAULT_SHIPS_BUTTON);
}

function hide(selector) {
    $(selector).hide();
}

function show(selector) {
    $(selector).show();
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

function info(message) {
    $(cons.INFO_BOX).html(message);
}

function initPlayerBoards() {
    trace("initPlayerBoards()");
    boardCells = [];
    enemyBoardCells = [];
    countCells = 0;
    for (var i = 0; i < 100; i++) {
        boardCells.push(0);
        enemyBoardCells.push(0);
    }
    updateBoardsColor();
    activatePlayerBoard();
    $("#enemyTable").css("border", "2px solid black");
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
