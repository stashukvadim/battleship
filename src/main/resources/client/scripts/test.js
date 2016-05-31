var shipSize;
var boardCells = [];
var enemyBoardCells = [];

function initPlayerBoard() {
    for (var i = 0; i < 100; i++) {
        $('#' + i).attr('name', '' + 0);
        var name = $('#' + i);
        console.log(name.name);
        boardCells.push(0);
    }
    console.log("boardCells = " + boardCells);
    updateBoardColor();
}

function activatePlayerBoard() {
    disablePlayerBoard();
    initPlayerBoard();
    $(".userTd").on("click", function (event) {
        var cellId = event.target.id;
        var cellName = event.target.name;
        console.log(cellId);
        console.log(cellId * 2);
        console.log(cellName);
    })
}

function disablePlayerBoard() {
    $(".userTd").off('click');
}

function activateEnemyBoard() {
    disableEnemyBoard();
    $(".enemyTd").on("click", function (event) {
        var cellId = event.target.id;
        fire(cellId);
    })
}

function disableEnemyBoard() {
    $(".enemyTd").off('click');
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

function cellCodeFromNumber(num) {
    var code;
    switch (num) {
        case 0 :
            code = '_';
            break;
        case -1:
            code = '*';
            break;
        case 1:
            code = 'S';
            break;
        case 2 :
            code = 'H';
            break;
    }
    return code;
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
    }
    return color;
}

function updateBoard(array, isEnemyBoard) {
    var selector = isEnemyBoard ? '#e' : '#';

    for (var i = 0; i < 100; i++) {
        var num = array[i];
        var code = cellCodeFromNumber(num);
        var color = colorForNumber(num);
        var currentSelector = selector + i;
        //$(currentSelector).css('background-color', color).attr('name', code);
        $(currentSelector).attr('name', code);
        if (num != 0) {
            $(currentSelector).off('click');
        }
    }
}

function updateBoards(params) {
    var isYourTurn = params.isYourTurn;
    handleTurn(isYourTurn);
    updateBoard(params.board);
    updateBoard(params.enemyBoard, true);
}

function updateBoardColor() {
    for (var i = 0; i < 100; i++) {
        var selector = '#' + i;
        var color = colorForNumber(boardCells[i]);
        $(selector).css('background-color', color)
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


