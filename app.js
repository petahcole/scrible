$(document).ready(function() {

    $('.modal').modal({
      complete: function() { $("#story-input").val(""); }
    });


    $("#poetry").click(function(event) {
        event.preventDefault();
        $(".prompt").html("");
        $.get("https://www.reddit.com/r/POETRYPrompts/new.json", getPoetryPrompt);
        setRandomMinMax();
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
        setRandomMinMax();
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
    $(".prompt").append("<h6>" + "Prompt:" + randomProsePrompt + "</h6>")

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
    $(".prompt").append("<h6>" + "Name: " + firstName + " " + lastName + "</h6>");

}


//Word Restrictions and Counter

function setRandomMinMax()  {
    var minWordsArr = [10, 25, 50];
    var maxWordsArr = [75, 100, 150, 200, 300]
    function randomize(array) {
      return array[Math.floor(Math.random() * array.length)];
    }
    var wordMin = randomize(minWordsArr);
    var wordMax = randomize(maxWordsArr);
    $(".word-restrictions").html("Min: " + wordMin + " Max: " + wordMax);
}

var $count = $("#count");
$count.click( function(event) {
  event.preventDefault();
  if ($("#story-input").length < wordMin) {
      $(".word-count").html("You need to write more!")
  } else if ($("#story-input").length > wordMax)  {
    $(".word-count").html("You need to delete some stuff")
  }
})
