/* Positions router */

/* Note: We're currently considering a MowingSession object,
which would store lots and lots of positions in a list.
Can't implement this router further until we know for sure. */

const express = require("express")

module.exports = function({ mowerInterface }) {

    const router = express.Router()

    /* Retrieve all positions */
    router.get('/', function(req, res) {

        res.send("Positions page!")

    })

    /* Create Positions instance */
    router.post('/', function(req, res) {

        return
    })

    return router
}