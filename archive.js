$("document").ready(function()  {

  var savedStories = JSON.parse(localStorage.getItem("archive"));

  for (var i = 0; i < savedStories.length; i++) {
    var stories = savedStories[i];
    $("main").append(

              "<div class='col s12 m6 l4 populate-stories'>" +
                  "<div class='card'>" +
                      "<div class='card-content'>" +
                          "<p>" + stories + "</p>" +
                      "</div>" +
                  "</div>" +
              "</div>"

    )
  }



})
