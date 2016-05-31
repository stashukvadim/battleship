var shipSize;
var boardCells = [];
var enemyBoardCells = [];
var countShipCells;
var shipSize;
var shipSet = false;
var shipCells = [];
var shipsCount = [0, 4, 3, 2, 1];

function initPlayerBoard() {
    for (var i = 0; i < 100; i++) {
        boardCells.push(0);
    }
    updateBoardsColor();
    addHandlersForShips();
}

function addHandlersForShips() {
    $('#ship4').on('click', function () {
        shipSelected(4);
    });
    $('#ship3').on('click', function () {
        shipSelected(3);

    });
    $('#ship2').on('click', function () {
        shipSelected(2);

    });
    $('#ship1').on('click', function () {
        shipSelected(1);
    });
}

function shipSelected(size) {
    shipSize = size;
    countShipCells = 0;
    console.log("shipSize = " + shipSize + ", countShipCells = " + countShipCells);
}

function activatePlayerBoard() {
    disablePlayerBoard();
    initPlayerBoard();
    for (var i = 0; i < 100; i++) {
        var cellState = boardCells[i];
        if (cellState == 0) {
            $("#" + i).on("click", function (event) {
                var cellId = event.target.id;
                console.log(cellId);
                handleShipCellSet(cellId);
            })
        }
        else {
            $("#" + i).off('click');
        }
    }
}

function handleShipCellSet(cellId) {
    //boardCells[cellId] =1;
    if (shipsCount[shipSize] == 0) {
        return;
    }
    shipCells.push(parseInt(cellId));
    countShipCells++;
    console.log(" countShipCells++ = " + countShipCells);
    if (countShipCells == shipSize) {
        putShip();
        console.log(boardCells);
        updateBoardsColor();
    }
    activatePlayerBoard();
}

function putShip() {
    console.log("in putShip()");
    for (var i = 0; i < shipCells.length; i++) {
        console.log("shipCells[i] = " + shipCells[i]);
        boardCells[shipCells[i]] = 1;
        console.log(boardCells);
    }
    putShipBorders();

    shipsCount[shipSize]--;
    if (shipsCount[shipSize] > 0) {
        countShipCells = 0;
        shipCells = [];
    }
}

function putShipBorders() {
    console.log("trace: putShipBorders() shipCells.length = " + shipCells.length);

    for (var i = 0; i < shipCells.length; i++) {
        putBordersForCell(shipCells[i]);
    }
}

function putBordersForCell(cellId) {
    console.log("trace: putBordersForCell() - cellId = " + cellId);
    var cellX = Math.floor(cellId / 10);
    var cellY = cellId % 10;
    for (var x = cellX - 1; x < cellX + 2; x++) {
        for (var y = cellY - 1; y < cellY + 2; y++) {
            if (isValidCoordinates(x, y)) {
                if (boardCells[xYToCellId(x, y)] != 1) {
                    boardCells[xYToCellId(x, y)] = -2;
                }
            }
        }
    }
}
function isValidCoordinates(x, y) {
    return x >= 0 && x < 10 && y >= 0 && y < 10;
}

function xYToCellId(x, y) {
    return x * 10 + y;
}

function isValidCell(cellId) {
    return cellId >= 0 && cellId < 100;
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


