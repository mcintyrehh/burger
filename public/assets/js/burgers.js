$(document).ready(function () {
    $("#newBurger").on("click", function () {
        // Make sure to preventDefault on a submit event.
        event.preventDefault();
        var newBurger = {
            name: $("#burgerName").val().trim()
        };

        // Send the POST request.
        $.ajax("/api/burgers", {
            type: "POST",
            data: newBurger
        }).then(
            function () {
                console.log("created new burger");
                // Reload the page to get the updated list
                location.reload();
            }
        );
    });
    $(".eat-button").on("click", function () {
        event.preventDefault();
        var id = $(this).attr('id');
        // Send the PUT request.
        $.ajax("/api/burgers/" + id, {
            type: "PUT",
            data: id
        }).then(
            function () {
                console.log("burger munched");
                // Reload the page to get the updated list
                location.reload();
            }
        );
    })
    $(".dropdown-item").on("click", function () {
        // Make sure to preventDefault on a submit event.
        event.preventDefault();
        var newBurger = {
            name: $(this).data("name")
        };
        console.log(newBurger);

        // Send the POST request.
        $.ajax("/api/burgers", {
            type: "POST",
            data: newBurger
        }).then(
            function () {
                console.log("created new burger");
                // Reload the page to get the updated list
                location.reload();
            }
        );
    });

});