var playerAshape = "fas fa-times";
var playerBshape = "fas fa-circle";
var playerTurnShape = playerAshape;
var inGame = false;
var playerAname = "A";
var playerBname = "B";
var freshStart = true;
var playerTurn = null;

function playerSetShape(player, shape) {
    if (player === playerAname) {
        playerAshape = shape;
    } else if (player === playerBname) {
        playerBshape = shape;
    } else {
        console.error("Unknown player!");
    }
}

function setPlayerTurn() {
    if (playerTurn === playerAname) {
        playerTurn = playerBname;
        playerTurnShape = playerBshape;
    } else {
        playerTurn = playerAname;
        playerTurnShape = playerAshape;
    }
}

function setCell(cell) {
    var content = cell.hasClass(playerAshape.split(" ")[1]) || cell.hasClass(playerBshape.split(" ")[1]);
    if(content) {
        console.log("cell not empty, exiting");
        return 1;
    }
    console.log("setting shape: " + playerTurnShape);
    cell.addClass(playerTurnShape);
}

function checkCell(cell) {
    shape = playerTurnShape.split(" ")[1];
    //console.log("split shape: " + shape);
    //console.log("checking cell for: " + playerTurnShape);
    //console.log($(".playarea").find(cell).find("i").hasClass(shape));
    return $(".playarea").find(cell).find("i").hasClass(shape);
}

function checkPlayerWin() {
    var win = 0;
    if (checkCell("#cell1") && checkCell("#cell2") && checkCell("#cell3"))
        win = 1;
    if (checkCell("#cell4") && checkCell("#cell5") && checkCell("#cell6"))
        win = 1;
    if (checkCell("#cell7") && checkCell("#cell8") && checkCell("#cell9"))
        win = 1;
    if (checkCell("#cell1") && checkCell("#cell4") && checkCell("#cell7"))
        win = 1;
    if (checkCell("#cell2") && checkCell("#cell5") && checkCell("#cell8"))
        win = 1;
    if (checkCell("#cell3") && checkCell("#cell6") && checkCell("#cell9"))
        win = 1;
    if (checkCell("#cell1") && checkCell("#cell5") && checkCell("#cell9"))
        win = 1;
    if (checkCell("#cell7") && checkCell("#cell5") && checkCell("#cell3"))
        win = 1;
    if (checkCell("#cell1") && checkCell("#cell2") && checkCell("#cell3"))
        win = 1;
    console.log("win status: " + win);
    if (win === 1) {
        alert(playerTurn + " je pobijedio!!!11!!");
        inGame = false;
    }
}

function reset() {
    $(".playarea").find(".cell").find("i").each(function() {
        $(this).removeClass(playerAshape).removeClass(playerBshape);
    });
}

$( document ).ready(function() {
    $(".cell").click(function() {
        if (inGame != true)
            return 1;
        console.log("clicked cell");
        cell = $(this).find("i");
        console.log("entering setCell()");
        setCell(cell);
        console.log("entering checkPlayerWin()");
        checkPlayerWin();
        console.log("entering setPlayerTurn()")
        setPlayerTurn();
    });

    $("#play-button").click(function() {
        playerAname = $("#playerAname").val();
        playerBname = $("#playerBname").val();
        reset();
        if (freshStart === true) {
            playerTurn = playerAname;
            freshStart = false;
        }
        inGame = true;
    });
});
