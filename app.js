

$(document).ready(function() {

    $('.modal').modal({
      complete: function() { $("#story-input").val(""); }
    });

    let minMax = setRandomMinMax();
    let minNum = minMax.wordMin;
    let maxNum = minMax.wordMax;
    let archivedStories = [];


    $("#poetry").click(function(event) {
        event.preventDefault();
        setPoetryPrompt(minMax, minNum, maxNum)
    });

    $("#prose").click(function(event) {
        event.preventDefault();
        setProsePrompt(minMax, minNum, maxNum);
    });

    // Wordcount

    $("#count").click( function(event) {
      event.preventDefault();
      wordCount(minNum, maxNum)
    });

    // Congrats

    $("#save").click(function(event)  {
      event.preventDefault();
      $(".congrats").html("You did it! You wrote today!");
    });

    // Save to LocalStorage

    $("#save").click(function(event)  {
      event.preventDefault();
      pushToLocalStorage(archivedStories)
    })

}); //end doc ready func

function API(APIurl)  {
  this.callAPI = function(callback) {
  $.get(APIurl, callback)
  }
}

function setPoetryPrompt(minMax, minNum, maxNum)  {

  $(".prompt").html("");
  $(".word-count").html("");
  let apiPoetry = new API("https://www.reddit.com/r/POETRYPrompts/new.json");
  apiPoetry.callAPI(getPoetryPrompt)
  let minMax = setRandomMinMax();
  minNum = minMax.wordMin;
  maxNum = minMax.wordMax;
  $(".congrats").html("");
}

function getPoetryPrompt(poetryData) {
    var poetryPrompts = [];
    for (var i = 0; i < poetryData.data.children.length; i++) {
        poetryPrompts.push(poetryData.data.children[i].data.title);
    }
    let randomPoetryPrompt = poetryPrompts[Math.floor(Math.random() * poetryPrompts.length)];
    randomPoetryPrompt = randomPoetryPrompt.replace("[PP]", "");
    $(".prompt").append("<h6>" +  "Prompt: " + randomPoetryPrompt + " </h6>");
};

function setProsePrompt (minMax, minNum, maxNum)  {
  $(".prompt").html("");
  $(".word-count").html("");
  let apiProse = new API("https://www.reddit.com/r/WritingPrompts/top.json");
  apiProse.callAPI(getProsePrompt)
  $.ajax({
      url: 'https://randomuser.me/api/',
      dataType: 'json',
      success: getProseCharacter
  });
  let minMax = setRandomMinMax();
  minNum = minMax.wordMin;
  maxNum = minMax.wordMax;
  $(".congrats").html("");
}


function getProsePrompt(proseData) {
    let prosePrompts = [];
    for (var i = 0; i < proseData.data.children.length; i++) {
        prosePrompts.push(proseData.data.children[i].data.title);
    }
    let randomProsePrompt = prosePrompts[Math.floor(Math.random() * prosePrompts.length)];
    randomProsePrompt = randomProsePrompt.replace("[WP]", "");
    $(".prompt").append("<h6>" + "Prompt:" + randomProsePrompt + "</h6>")

}

function getProseCharacter(userData) {
    let nameData = userData.results[0].name;
    let firstName = nameData.first;
    let lastName = nameData.last;

    function capitalizeFirstLetter(string) {
        return string[0].toUpperCase() + string.slice(1);
    };
    firstName = capitalizeFirstLetter(firstName);
    lastName = capitalizeFirstLetter(lastName);
    $(".prompt").append("<h6>" + "Name: " + firstName + " " + lastName + "</h6>");

}


function wordCount(minNum, maxNum)  {
  let $storyLength = $("#story-input").val().split(" ").length;
  if ($storyLength > minNum && $storyLength < maxNum)  {
      $(".word-count").html($storyLength + " Words. You're in the sweet spot!");
  } else if ($storyLength > maxNum)  {
    $(".word-count").html($storyLength + " Words. You need to delete some stuff!");
    } else if ($storyLength < minNum) {
      $(".word-count").html($storyLength + " Words. You need to write more!");
    }
}

//Word Restrictions

function setRandomMinMax()  {
    let minWordsArr = [10, 25, 50];
    let maxWordsArr = [75, 100, 150, 200, 300]
    function randomize(array) {
      return array[Math.floor(Math.random() * array.length)];
    }
    let wordMin = randomize(minWordsArr);
    let wordMax = randomize(maxWordsArr);
    $(".word-restrictions").html("Min: " + wordMin + " Max: " + wordMax);
    return {
      wordMin: wordMin,
      wordMax: wordMax
    }
}


function pushToLocalStorage(archivedStories) {
    let input = document.getElementById("story-input").value;
    input = input.replace( /\n/g, "<br>");
    let storedItem = JSON.parse(localStorage.getItem("archive"));
    if (localStorage.key("archive") !== "archive") {
        archivedStories.push(input);
        localStorage.setItem("archive", JSON.stringify(archivedStories));
    } else if (archivedStories.length < storedItem.length) {
        archivedStories = storedItem;
        archivedStories.push(input);
        localStorage.setItem("archive", JSON.stringify(archivedStories));
    }
}
