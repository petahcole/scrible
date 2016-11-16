$("document").ready(function()  {

  var savedStories = JSON.parse(localStorage.getItem("archive"));

  for (var i = 0; i < savedStories.length; i++) {
    var stories = savedStories[i];
    console.log(stories);
    $("main").append(

              "<div class='col s4'>" +
                  "<div class='card'>" +
                      "<div class='card-content'>" +
                          "<p>" + stories + "</p>" +
                      "</div>" +
                  "</div>" +
              "</div>"

    )
  }



})
