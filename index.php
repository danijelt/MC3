<html>
<head>
    <meta charset="utf-8"/>
    <title>Tic-tac-toe</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" integrity="sha384-WskhaSGFgHYWDcbwN70/dfYBj47jz9qbsMId/iRN3ewGhXQFZCSftd1LZCfmhktB" crossorigin="anonymous">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.13/css/all.css" integrity="sha384-DNOHZ68U8hZfKXOrtjWvjxusGo9WQnrNx2sqG0tfsghAvtVlRW3tvkXWZh58N9jp" crossorigin="anonymous">
    <link rel="stylesheet" type="text/css" href="style.css">
    <script src="https://code.jquery.com/jquery-3.3.1.min.js" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js" integrity="sha384-smHYKdLADwkXOn1EmN1qk/HfnUcbVRZyYmZ4qpPea6sjB/pTJ0euyQp0Mk8ck+5T" crossorigin="anonymous"></script>
    <script src="lang.js"></script>
    <script src="script.js"></script>
</head>
<body>
    <br/>
    <div class="container">
        <div class="row">
            <div class="dropdown col-lg-1 offset-lg-2">
                <button class="btn btn-secondary" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i class="fas fa-ellipsis-h"></i>
                </button>
                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <a class="dropdown-item" href="#" id="change-theme" tkey="change-theme"></a>
                    <a class="dropdown-item" href="#" id="rgb-color" tkey="rgb-color"></a>
                    <a class="dropdown-item" href="#" id="change-language" tkey="change-language"></a>
                </div>
            </div>
            <div class="col-lg-6">
                <div class="form-inline">
                    <input type="text" class="form-control mb-2 mr-sm-2" id="playerAnameInput" placeholder="" required="required">
                    <input type="text" class="form-control mb-2 mr-sm-2" id="playerBnameInput" placeholder="" required="required">
                    <button class="btn btn-primary mb-2" id="play-button" tkey="play-button"></button>
                </div>
            </div>
            <div class="col-lg-3">
                <button class="btn btn-secondary fas fa-music"></button>
            </div>
        </div>
        <div class="row playarea">
            <div class="col-lg-6 offset-lg-3">
                <div class="square-grid">
                    <div class="square-grid__cell square-grid__cell--3">
                        <div class="square-grid__content cell" id="cell1">
                            <i></i>
                        </div>
                    </div>
                    <div class="square-grid__cell square-grid__cell--3">
                        <div class="square-grid__content cell" id="cell2">
                            <i></i>
                        </div>
                    </div>
                    <div class="square-grid__cell square-grid__cell--3">
                        <div class="square-grid__content cell" id="cell3">
                            <i></i>
                        </div>
                    </div>
                    <div class="square-grid__cell square-grid__cell--3">
                        <div class="square-grid__content cell" id="cell4">
                            <i></i>
                        </div>
                    </div>
                    <div class="square-grid__cell square-grid__cell--3">
                        <div class="square-grid__content cell" id="cell5">
                            <i></i>
                        </div>
                    </div>
                    <div class="square-grid__cell square-grid__cell--3">
                        <div class="square-grid__content cell" id="cell6">
                            <i></i>
                        </div>
                    </div>
                    <div class="square-grid__cell square-grid__cell--3">
                        <div class="square-grid__content cell" id="cell7">
                            <i></i>
                        </div>
                    </div>
                    <div class="square-grid__cell square-grid__cell--3">
                        <div class="square-grid__content cell" id="cell8">
                            <i></i>
                        </div>
                    </div>
                    <div class="square-grid__cell square-grid__cell--3">
                        <div class="square-grid__content cell" id="cell9">
                            <i></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <br/>
        <div class="row">
            <div class="col-lg-6 offset-lg-3">
                <div class="stats text-center">
                    <i id="playerAshape"></i>&nbsp;<p id="playerAnameP"></p> | <i id="playerBshape"></i>&nbsp;<p id="playerBnameP"></p>
                    <br/>
                    <p tkey="result"></p>&nbsp;<p id="playerAwins"></p>:<p id="playerBwins"></p>
                </div>
            </div>
        </div>
    </div>
</body>
</html>