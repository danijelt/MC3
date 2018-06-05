var playerAshape = "fas fa-times";
var playerBshape = "fas fa-circle";
var playerTurnShape = playerAshape;
var setShape = "";
var inGame = false;
var playerAname = "A";
var playerBname = "B";
var freshStart = true;
var playerTurn = null;
var playerAwins = 0;
var playerBwins = 0;
var theme = "light";
var symbolColor = "red";
var blinkerInterval = 0;

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
        return false;
    } else {
        //console.log("setting shape: " + playerTurnShape);
        cell.addClass(playerTurnShape);
        return true;
    }
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
    if (checkCell("#cell1") && checkCell("#cell2") && checkCell("#cell3")) {
        blinkWin([1,2,3]);
        win = 1;
    } else if (checkCell("#cell4") && checkCell("#cell5") && checkCell("#cell6")) {
        blinkWin([4,5,6]);
        win = 1;
    } else if (checkCell("#cell7") && checkCell("#cell8") && checkCell("#cell9")) {
        blinkWin([7,8,9]);
        win = 1;
    } else if (checkCell("#cell1") && checkCell("#cell4") && checkCell("#cell7")) {
        blinkWin([1,4,7]);
        win = 1;
    } else if (checkCell("#cell2") && checkCell("#cell5") && checkCell("#cell8")) {
        blinkWin([2,5,8]);
        win = 1;
    } else if (checkCell("#cell3") && checkCell("#cell6") && checkCell("#cell9")) {
        blinkWin([3,6,9]);
        win = 1;
    } else if (checkCell("#cell1") && checkCell("#cell5") && checkCell("#cell9")) {
        blinkWin([1,5,9]);
        win = 1;
    } else if (checkCell("#cell7") && checkCell("#cell5") && checkCell("#cell3")) {
        blinkWin([7,5,3]);
        win = 1;
    }
    //console.log("win status: " + win);
    if (win === 1) {
        if (playerTurn == "A")
            playerAwins++;
        else if (playerTurn == "B")
            playerBwins++;
        inGame = false;
        uploadResult();
        setStats();
        $("#playerAnameInput").removeAttr('disabled');
        $("#playerBnameInput").removeAttr('disabled');
    }
}

function uploadResult() {
    if (playerTurn == "A")
        $.post("results.php", "set_result=1&player=" + playerAname);
    else if (playerTurn == "B")
        $.post("results.php", "set_result=1&player=" + playerBname);
}

function reset() {
    $(".playarea").find(".cell").find("i").each(function() {
        $(this).removeClass();
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

function blinkWin(cells) {
    blinkerInterval = setInterval(function() {
        for (var cell in cells) {
            $("#cell" + cells[cell] + " > i").toggle();
        }
    }, 500);
}

function resetBlink() {
    clearInterval(blinkerInterval);
    for (i=1; i<10; i++) {
        $("#cell" + i + " > i").show();
    }
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
        if (!setCell(cell))
            return false;
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
            $("#playerAshape").css("color", "green");
            $("#playerBshape").css("color", "green");
            symbolColor = "green";
        } else if (symbolColor == "green") {
            $(".square-grid__content").css("color", "#00f");
            $("#playerAshape").css("color", "blue");
            $("#playerBshape").css("color", "blue");
            symbolColor = "blue";
        } else if (symbolColor == "blue") {
            $(".square-grid__content").css("color", "#f00");
            $("#playerAshape").css("color", "red");
            $("#playerBshape").css("color", "red");
            symbolColor = "red";
        } else {
            $(".square-grid__content").css("color", "#f00");
            $("#playerAshape").css("color", "red");
            $("#playerBshape").css("color", "red");
            symbolColor = "red";
        }
    });

    $("#scoreboard").click(function() {
        $.post("results.php", "get_results=1", function(data) {
            var json = $.parseJSON(JSON.stringify(data));
            var sorted = [];
            var htmlstr = "";
            var i = 1;
            for (var player in json) {
                sorted.push([player, json[player]]);
            }
            sorted.sort(function (a,b) { return b[1] - a[1]; });
            for (var rank in sorted) {
                htmlstr += i + ". " + sorted[rank][0] + " - " + sorted[rank][1] + "<br/>";
                i++;
            }
            $("#scoreboard-body").html(htmlstr);
        }, "json");
    });

    $("#playerAshape").click(function() {
        if (inGame == true)
            return false;
        setShape = "A";
        $("#shape-modal").modal("show");
    });

    $("#playerBshape").click(function() {
        if (inGame == true)
            return false;
        setShape = "B";
        $("#shape-modal").modal("show");
    });

    $("#shape-body").on("click", ">", function() {
        if (inGame == true)
            return false;
        if (setShape == "A") {
            if ($(this).attr('class') == playerBshape)
                return false;
            $("#playerAshape").removeClass()
            if (playerTurnShape == playerAshape)
                playerTurnShape = $(this).attr('class');
            playerAshape = $(this).attr('class');
            $("#playerAshape").addClass(playerAshape);
        } else if (setShape == "B") {
            if ($(this).attr('class') == playerAshape)
                return false;
            $("#playerBshape").removeClass();
            if (playerTurnShape == playerBshape)
                playerTurnShape = $(this).attr('class');
            playerBshape = $(this).attr('class');
            $("#playerBshape").addClass(playerBshape);
        }
        $("#shape-modal").modal("hide");
    });

    $("#music-button").click(function() {
        var player = $("#music-player")[0];
        if (player.paused)
            player.play();
        else
            player.pause();
    });

    $("#change-language").click(function() {
        setLanguage();
    });

});
