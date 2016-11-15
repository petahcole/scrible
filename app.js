$(document).ready(function() {

    $("#poetry").click(function(event) {
        event.preventDefault();
        $(".prompt").html("");
        $.get("https://www.reddit.com/r/POETRYPrompts/new.json", getPoetryPrompt);
    });

    $("#prose").click(function(event) {
        event.preventDefault();
        $(".prompt").html("");
        $.get("https://www.reddit.com/r/WritingPrompts/top.json", getProsePrompt);
        $.ajax({
            url: 'https://randomuser.me/api/',
            dataType: 'json',
            success: getProseCharacter
        });
    });
});

function getPoetryPrompt(poetryData) {
    var poetryPrompts = [];
    for (var i = 0; i < poetryData.data.children.length; i++) {
        poetryPrompts.push(poetryData.data.children[i].data.title);
    }
    var randomPoetryPrompt = poetryPrompts[Math.floor(Math.random() * poetryPrompts.length)];
    randomPoetryPrompt = randomPoetryPrompt.replace("[PP]", "");
    $(".prompt").append("<h6>'" + randomPoetryPrompt + " '</h6>");
};

function getProsePrompt(proseData) {
    var prosePrompts = [];
    for (var i = 0; i < proseData.data.children.length; i++) {
        prosePrompts.push(proseData.data.children[i].data.title);
    }
    var randomProsePrompt = prosePrompts[Math.floor(Math.random() * prosePrompts.length)];
    randomProsePrompt = randomProsePrompt.replace("[WP]", "");
    $(".prompt").append("<h6>'" + "Prompt:" + randomProsePrompt + "'</h6>")

}

function getProseCharacter(userData) {
    var nameData = userData.results[0].name;
    var firstName = nameData.first;
    var lastName = nameData.last;

    function capitalizeFirstLetter(string) {
        return string[0].toUpperCase() + string.slice(1);
    };
    firstName = capitalizeFirstLetter(firstName);
    lastName = capitalizeFirstLetter(lastName);
    $(".prompt").append("<h6>'" + "Name: " + firstName + " " + lastName + "'</h6>")
}
