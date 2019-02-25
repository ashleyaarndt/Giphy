$(document).ready(function() {
  var topics = [
    "The Office",
    "The Cincinnati Bengals",
    "Led Zeppelin",
    "Cats",
    "Poker",
    "Nicolas Cage",
    "Pulp Fiction",
    "Spongebob",
    "Ghosts",
    "How I Met Your Mother"
  ];

  var results;

  function makeButtons() {
    $("#gif-buttons").empty();

    for (i = 0; i < topics.length; i++) {
      var gifButtons = $("<button>");

      gifButtons.addClass("new-Button");

      gifButtons.attr("data-name", topics[i]);

      gifButtons.text(topics[i]);

      $("#gif-buttons").append(gifButtons);
    }
  }

  $("#add-button").on("click", function(event) {
    event.preventDefault();

    var newButton = $("#button-input")
      .val()
      .trim();

    topics.push(newButton);

    $("#button-input").val("");

    makeButtons();

    console.log(topics);
  });

  makeButtons();

  function displayGifs() {
    var gifName = $(this).attr("data-name");

    var gifString = gifName.split(" ").join("+");

    var giphyURL =
      "https://api.giphy.com/v1/gifs/search?q=" +
      gifString +
      "&api_key=1hikPM59LIK1FTDz1m5Su7xCbJ9TfaA8&limit=10";

    $.ajax({ url: giphyURL, method: "GET" }).done(function(response) {
      console.log(giphyURL);

      console.log(response);

      results = response.data;

      $("#gifs").empty();

      for (var i = 0; i < results.length; i++) {
        var thingsDiv = $("<div>");

        var gifRating = $("<p class='rating'>").text(
          "Rating: " + results[i].rating.toUpperCase()
        );

        var image = $("<img>");

        gifRating.addClass("rating-text");

        image.addClass("image-gifs");

        image.attr("src", results[i].images.fixed_height_still.url);

        image.attr("data-state", "still");

        image.attr("data-position", i);

        thingsDiv.append(gifRating);

        thingsDiv.append(image);

        thingsDiv.addClass("individual-gifs");

        $("#gifs").prepend(thingsDiv);
      }
    });
  }

  $(document).on("click", ".new-Button", displayGifs);

  function gifAnimation() {
    var state = $(this).attr("data-state");

    var position = $(this).attr("data-position");

    position = parseInt(position);

    console.log(results[position].images.fixed_height.url);

    console.log(position);

    if (state === "still") {
      $(this).attr("src", results[position].images.fixed_height.url);

      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", results[position].images.fixed_height_still.url);

      $(this).attr("data-state", "still");
    }
  }

  $(document).on("click", ".image-gifs", gifAnimation);
});
