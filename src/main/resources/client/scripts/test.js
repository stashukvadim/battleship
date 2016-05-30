function addEventListenersToTables() {
    $("td").click(function (event) {
        var cellId = event.target.id;
        alert(cellId);
        onSetShipCellClick(cellId);
    })
}