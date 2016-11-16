$(document).ready(function() {

    $('.modal').modal({
      complete: function() { $("#story-input").val(""); }
    });



    var minMax = setRandomMinMax();
    var minNum = minMax.wordMin;
    var maxNum = minMax.wordMax;
    var archivedStories = [];


    $("#poetry").click(function(event) {
        event.preventDefault();
        $(".prompt").html("");
        $(".word-count").html("");
        $.get("https://www.reddit.com/r/POETRYPrompts/new.json", getPoetryPrompt);
        var minMax = setRandomMinMax();
        minNum = minMax.wordMin;
        maxNum = minMax.wordMax;
        $(".congrats").html("");
    });

    $("#prose").click(function(event) {
        event.preventDefault();
        $(".prompt").html("");
        $(".word-count").html("");
        $.get("https://www.reddit.com/r/WritingPrompts/top.json", getProsePrompt);
        $.ajax({
            url: 'https://randomuser.me/api/',
            dataType: 'json',
            success: getProseCharacter
        });
        var minMax = setRandomMinMax();
        minNum = minMax.wordMin;
        maxNum = minMax.wordMax;
        $(".congrats").html("");

    });

    // Wordcount

    $("#count").click( function(event) {
      event.preventDefault();
      var $storyLength = $("#story-input").val().split(" ").length;

      if ($storyLength > minNum && $storyLength < maxNum)  {
          $(".word-count").html($storyLength + " Words. You're in the sweet spot!");
      } else if ($storyLength > maxNum)  {
        $(".word-count").html($storyLength + " Words. You need to delete some stuff!");
      } else if ($storyLength < minNum) {
          $(".word-count").html($storyLength + " Words. You need to write more!");
        }
    });

    // Congrats

    $("#save").click(function(event)  {
      event.preventDefault();
      $(".congrats").html("You did it! You wrote today!")
    });

    // Save to LocalStorage

    $("#save").click(function(event)  {
      event.preventDefault();
      var $input = $("#story-input").val();
      pushToLocalStorage(archivedStories, $input)

      // localStorage.setItem("archive", $input);

    })

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


//Word Restrictions

function setRandomMinMax()  {
    var minWordsArr = [10, 25, 50];
    var maxWordsArr = [75, 100, 150, 200, 300]
    function randomize(array) {
      return array[Math.floor(Math.random() * array.length)];
    }
    var wordMin = randomize(minWordsArr);
    var wordMax = randomize(maxWordsArr);
    $(".word-restrictions").html("Min: " + wordMin + " Max: " + wordMax);
    return {
      wordMin: wordMin,
      wordMax: wordMax
    }
}


function pushToLocalStorage(archivedStories, $input) {
    var storedItem = JSON.parse(localStorage.getItem("archive"));
    if (localStorage.key("archive") !== "archive") {
        archivedStories.push($input);
        localStorage.setItem("archive", JSON.stringify(archivedStories));
    } else if (archivedStories.length < storedItem.length) {
        archivedStories = storedItem;
        archivedStories.push($input);
        localStorage.setItem("archive", JSON.stringify(archivedStories));
    }



}
