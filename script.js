var playerAshape = "fas fa-times";
var playerBshape = "fas fa-circle";
var playerTurnShape = playerAshape;
var inGame = false;
var playerAname = "A";
var playerBname = "B";
var freshStart = true;
var playerTurn = null;
var playerAwins = 0;
var playerBwins = 0;
var theme = "light";
var symbolColor = "red";

function playerSetShape(player, shape) {
    if (player === playerAname) {
        playerAshape = shape;
    } else if (player === playerBname) {
        playerBshape = shape;
    } /*else {
        console.error("Unknown player!");
    }*/
}

function setPlayerTurn() {
    if (playerTurn === "A") {
        playerTurn = "B";
        playerTurnShape = playerBshape;
    } else {
        playerTurn = "A";
        playerTurnShape = playerAshape;
    }
}

function setCell(cell) {
    var content = cell.hasClass(playerAshape.split(" ")[1]) || cell.hasClass(playerBshape.split(" ")[1]);
    if(content) {
        //console.log("cell not empty, exiting");
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
    //console.log("win status: " + win);
    if (win === 1) {
        if (playerTurn == "A")
            playerAwins++;
        else if (playerTurn == "B")
            playerBwins++;
        inGame = false;
        setStats();
        $("#playerAnameInput").removeAttr('disabled');
        $("#playerBnameInput").removeAttr('disabled');
    }
}

function reset() {
    $(".playarea").find(".cell").find("i").each(function() {
        $(this).removeClass(playerAshape).removeClass(playerBshape);
    });
}

function setStats() {
    $("#playerAshape").addClass(playerAshape);
    $("#playerBshape").addClass(playerBshape);
    $("#playerAnameP").text(playerAname);
    $("#playerBnameP").text(playerBname);
    $("#playerAwins").text(playerAwins);
    $("#playerBwins").text(playerBwins);
}

$( document ).ready(function() {
    setLanguage();
    setStats();
    $(".cell").click(function() {
        if (inGame != true)
            return 1;
        //console.log("clicked cell");
        cell = $(this).find("i");
        //console.log("entering setCell()");
        setCell(cell);
        //console.log("entering checkPlayerWin()");
        checkPlayerWin();
        //console.log("entering setPlayerTurn()")
        setPlayerTurn();
    });

    $("#play-button").click(function() {
        $("#playerAnameInput").attr('disabled', 'disabled');
        $("#playerBnameInput").attr('disabled', 'disabled');
        resetBlink();
        if ($("#playerAnameInput").val() != "") {
            if (playerAname != $("#playerAnameInput").val())
                playerAwins = 0;
            playerAname = $("#playerAnameInput").val();
        } else {
            if (playerAname != $("#playerAnameInput").attr("placeholder"))
                playerAwins = 0;
            playerAname = $("#playerAnameInput").attr("placeholder");
            $("#playerAnameInput").val(playerAname);
        }
        if ($("#playerBnameInput").val() != "") {
            if (playerBname != $("#playerBnameInput").val())
                playerBwins = 0;
            playerBname = $("#playerBnameInput").val();
        } else {
            if (playerBname != $("#playerBnameInput").attr("placeholder"))
                playerBwins = 0;
            playerBname = $("#playerBnameInput").attr("placeholder");
            $("#playerBnameInput").val(playerBname);
        }
        reset();
        setStats();
        if (freshStart === true) {
            playerTurn = "A";
            freshStart = false;
        }
        inGame = true;
    });

    $("#change-theme").click(function() {
        if (theme == "light") {
            $("body").css("background-color", "#222");
            $(".square-grid__cell").css("box-shadow", "0 0 0 1px #777");
            $(".form-control").css("background-color", "#222");
            $(".form-control").css("color", "#aaa");
            $(".form-control").css("border", "1px solid #777");
            $(".stats").css("color", "#aaa");
            $(".stats").css("box-shadow", "0 0 0 1px #777");
            theme = "dark";
        } else {
            $("body").css("background-color", "#fff");
            $(".square-grid__cell").css("box-shadow", "0 0 0 1px #000");
            $(".form-control").css("background-color", "#fff");
            $(".form-control").css("color", "#495057");
            $(".form-control").css("border", "1px solid #ced4da");
            $(".stats").css("color", "#212529");
            $(".stats").css("box-shadow", "0 0 0 1px #000");
            theme = "light";
        }
    });

    $("#rgb-color").click(function() {
        if (symbolColor == "red") {
            $(".square-grid__content").css("color", "#0f0");
            $("#rgb-color").css("color", "green");
            symbolColor = "green";
        } else if (symbolColor == "green") {
            $(".square-grid__content").css("color", "#00f");
            $("#rgb-color").css("color", "blue");
            symbolColor = "blue";
        } else if (symbolColor == "blue") {
            $(".square-grid__content").css("color", "#f00");
            $("#rgb-color").css("color", "red");
            symbolColor = "red";
        } else {
            $(".square-grid__content").css("color", "#f00");
            $("#rgb-color").css("color", "red");
            symbolColor = "red";
        }
    });

    $("#change-language").click(function() {
        setLanguage();
    });

});
