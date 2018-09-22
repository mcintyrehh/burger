var express = require("express");

var router = express.Router();

// Import the model (burger.js) to use its database functions.
var burger = require("../models/burger.js");
//home page gets all of the burgers from the database and returns them to us in a handlebars object
router.get("/", function (req, res) {
    burger.selectAll(function (data) {
        var handlebarsObject = {
            burgers: data
        };
        console.log(handlebarsObject);
        res.render("index", handlebarsObject);
    });
});
//when a post is sent here, it adds the burger name and default 'devoured' as false, and returns the info about the new burger
router.post("/api/burgers", function (req, res) {
    burger.insertOne(["burger_name", "devoured"], [req.body.name, 0], function (result) {
        // Send back the ID of the new quote
        res.json({ burger_name: result.burger_name });
    });
});
//when a burger button is pressed it sends a put call to the below
//the put call scrapes the id, matches the id to the one int the database and markes it eaten or 'devoured'
router.put("/api/burgers/:id", function (req, res) {
    var condition = req.params.id;
    burger.updateOne(condition, function(result) {
        if (result.changedRows == 0) {
            // If no rows were changed, then the ID must not exist, so 404
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    })
})

// Export routes for server.js to use.
module.exports = router;