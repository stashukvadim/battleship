function activatePlayerBoard() {
    $(".userTd").on("click", function (event) {
        var cellId = event.target.id;
        console.log(cellId);
        onSetShipCellClick(cellId);
    })
}

function disablePlayerBoard() {
    $(".userTd").off('click');
}

function activateEnemyBoard() {
    $(".enemyTd").on("click", function (event) {
        var cellId = event.target.id;
        console.log(cellId);
        fire(cellId);
    })
}

function disableEnemyBoard() {
    $(".enemyTd").off('click');
}

function showBoards() {
    $(".board").show();
}

function fire(id) {
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
        $(currentSelector).css('background-color', color).attr('name', code);
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
