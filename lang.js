var lang_hr = {
    "change-theme": "Promijeni temu",
    "rgb-color": "Promijeni boju simbola",
    "change-language": "English",
    "play-button": "Igraj!",
    "playerAname": "Igrač 1",
    "playerBname": "Igrač 2",
    "result": "Rezultat:"
}

var lang_en = {
    "change-theme": "Change theme",
    "rgb-color": "Change symbol color",
    "change-language": "Hrvatski",
    "play-button": "Play!",
    "playerAname": "Player 1",
    "playerBname": "Player 2",
    "result": "Result:"
}

var currentLang = "";

var translate = function (jsdata) {
	$("[tkey]").each(function (index) {
		var strTr = jsdata[$(this).attr('tkey')];
		if (Array.isArray(strTr))
			strTr = strTr.join("");
		$(this).html(strTr);
    });
    $("#playerAnameInput").attr("placeholder", jsdata["playerAname"]);
    $("#playerBnameInput").attr("placeholder", jsdata["playerBname"]);
}

function setLanguage() {
	if (currentLang == "en") {
        translate(lang_hr);
        currentLang = "hr";
	} else if (currentLang == "hr") {
        translate(lang_en);
        currentLang = "en";
	} else {
        translate(lang_hr);
        currentLang = "hr";
    }
}