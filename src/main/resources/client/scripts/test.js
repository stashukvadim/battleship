function activatePlayerBoard() {
    $(".userTd").on("click", function (event) {
        var cellId = event.target.id;
        alert(cellId);
        onSetShipCellClick(cellId);
    })
}

function disablePlayerBoard() {
    $(".userTd").off('click');
}

function activateEnemyBoard() {
    $(".enemyTd").on("click", function (event) {
        var cellId = event.target.id;
        alert(cellId);
        fire(cellId);
    })
}

function disableEnemyBoard() {
    $(".enemyTd").off('click');
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

function updateBoard(array, isEnemyBoard) {
    var selector = isEnemyBoard ? '#e' : '#';

    for (var i = 0; i < 100; i++) {
        var code = cellCodeFromNumber(array[i]);
        $(selector + i).html(code);
    }
}

function updateBoards(params) {
    updateBoard(params.board);
    updateBoard(params.enemyBoard, true);
}
