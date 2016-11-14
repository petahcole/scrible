$(document).ready(function() {
  $("#poetry").click(function() {
    // event.preventDefault();
    $.get("https://www.reddit.com/r/POETRYPrompts/new.json", getPoetryPrompt)
  });

})

function getPoetryPrompt(poetryData)  {
  console.log(poetryData.data.children[0].data.title);
  //loop through .children[i]
  //push data.title into an array
  //randomize the array
  //print random prompt
  

}
