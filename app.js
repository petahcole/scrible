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

    })
})

function getPoetryPrompt(poetryData) {
    var poetryPrompts = []
    for (var i = 0; i < poetryData.data.children.length; i++) {
        poetryPrompts.push(poetryData.data.children[i].data.title);
    }
    var randomPoetryPrompt = poetryPrompts[Math.floor(Math.random() * poetryPrompts.length)];
    randomPoetryPrompt = randomPoetryPrompt.replace("[PP]", "");
    $(".prompt").append("<h5>'" + randomPoetryPrompt + " '</h5>");
};

function getProsePrompt(proseData)  {
    var prosePrompts = [];

    for (var i = 0; i < proseData.data.children.length; i++) {
        prosePrompts.push(proseData.data.children[i].data.title);
    }
    var randomProsePrompt = prosePrompts[Math.floor(Math.random() * prosePrompts.length)];
    randomProsePrompt = randomProsePrompt.replace("[WP]", "");
    $(".prompt").append("<h5>'" + randomProsePrompt + "'</h5>")

}
