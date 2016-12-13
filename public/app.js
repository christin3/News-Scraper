// Grab the articles as a json
$("#articles").append("<button id='clearDB'> Clear Articles </button>");
$.getJSON("/articles", function (data) {
    // For each one
    for (var i = 0; i < data.length; i++) {
        // Display the apropos information on the page
        $("#articles").append("<div id='article'>"+"<h6 data-id='" + data[i]._id + "'>" + data[i].title +"</h6>" +"<p>"+ data[i].link + "</p>"+"</div>" + "<br>");
    }
});

$(document).on("click", "h6", function () {


    // Empty the notes from the note section
    $("#notes").empty();
    // Save the id from the p tag
    var thisId = $(this).attr("data-id");

    // Now make an ajax call for the Article
    $.ajax({
        method: "GET",
        url: "/articles/" + thisId
    })
    // With that done, add the note information to the page
        .done(function (data) {
            console.log(data);
            // The title of the article
            $("#notes").append("<h6 >" + data.title + "</h6>");
            // An input to enter a new title
            $("#notes").append("<input id='titleinput' name='title' placeholder= 'Name' >");
            // A textarea to add a new note body
            $("#notes").append("<textarea id='bodyinput' name='body' placeholder= 'Write your note here'></textarea>");
            // A button to submit a new note, with the id of the article saved to it
            $("#notes").append("<button   data-id='" + data._id + "' id='savenote' > Save Note </button>");
            $("#notes").append("<button data-id='" + data._id + "' id='deletenote'> Delete Note </button>");

            // If there's a note in the article
            if (data.note) {
                // Place the title of the note in the title input
                $("#titleinput").val(data.note.title);
                // Place the body of the note in the body textarea
                $("#bodyinput").val(data.note.body);
            }
        });
});

// When you click the savenote button
$(document).on("click", "#savenote", function () {
    // Grab the id associated with the article from the submit button
    var thisId = $(this).attr("data-id");

    // Run a POST request to change the note, using what's entered in the inputs
    $.ajax({
        method: "POST",
        url: "/articles/" + thisId,
        data: {
            // Value taken from title input
            title: $("#titleinput").val(),
            // Value taken from note textarea
            body: $("#bodyinput").val()
        }
    })
    // With that done
        .done(function (data) {
            // Log the response
            console.log(data);
            // Empty the notes section
            $("#notes").empty();
        });

    // Also, remove the values entered in the input and textarea for note entry
    $("#titleinput").val("");
    $("#bodyinput").val("");
});



$(document).on("click", "#deletenote", function () {
    // Grab the id associated with the article from the delete button
    var thisId = $(this).attr("data-id");

    // Run a POST request to change the note, using what's entered in the inputs
    $.ajax({
        method: "DELETE",
        url: "/articles/" + thisId,
    })
    // With that done
        .done(function (data) {
            // Log the response
            console.log(data);
        });

    // Also, remove the values entered in the input and textarea for note entry
    $("#titleinput").val("");
    $("#bodyinput").val("");
});

$(document).on("click", "#clearDB", function () {
    // Grab the id associated with the article from the delete button
    var thisId = $(this).attr("data-id");

    // Run a POST request to change the note, using what's entered in the inputs
    $.ajax({
        method: "DELETE",
        url: "/articles/" + thisId,
    })
    // With that done
        .done(function (data) {
            // Log the response
            console.log(data);
        });

    $("#articles").empty();


});
