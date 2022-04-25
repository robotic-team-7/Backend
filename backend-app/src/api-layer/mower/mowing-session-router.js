/* Mowing session router */

const express = require("express")

module.exports = function({ mowerSessionInterface }) {

    const router = express.Router()

    /* Create new mowing session */
    router.post('/', function(req, res) {

        let mowerPositions = req.body.mowerPositions
        let mowerId = req.body.mowerId

        mowerSessionInterface.createMowerSession(mowerPositions, mowerId, function(error, mowingSessionId) {

            if (error.length == 0) {
                res.status(200).json(mowingSessionId)
            }
            else {
                res.status(400).json(error)
            }
        })
    })

    /* Add new positions to mowing session */
    router.put('/', function(req, res) {

        let mowingSessionId = req.body.mowingSessionId
        let newMowerPositions = req.body.newMowerPositions

        mowerSessionInterface.addMowerPositions(mowingSessionId, newMowerPositions, function(error, mowerPositions) {

            if (error.length == 0) {
                res.status(200).json(mowerPositions)
            }
            else {
                res.status(400).json(error)
            }
        })
    })

    return router
}