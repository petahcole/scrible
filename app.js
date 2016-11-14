$(document).ready(function() {
    $("#poetry").click(function() {
      $(".prompt").html("")
        // event.preventDefault();
        $.get("https://www.reddit.com/r/POETRYPrompts/new.json", getPoetryPrompt)
    });

})

function getPoetryPrompt(poetryData) {
    var poetryPrompts = []
    for (var i = 0; i < poetryData.data.children.length; i++) {
        poetryPrompts.push(poetryData.data.children[i].data.title);
    }
    var randomPoetryPrompt = poetryPrompts[Math.floor(Math.random() * poetryPrompts.length)];
    var randomPoetryPrompt = randomPoetryPrompt.replace("[PP]","")
    $(".prompt").append("<h5>'" + randomPoetryPrompt + " '</h5>");
}
