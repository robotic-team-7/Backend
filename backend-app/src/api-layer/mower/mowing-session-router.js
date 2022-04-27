/* Mowing session router */

const express = require("express")

module.exports = function({ mowingSessionInterface }) {

    const router = express.Router()

    /* Create new mowing session */
    router.post('/', function(req, res) {

        let mowerPositions = req.body.mowerPositions
        let mowerId = parseInt(req.body.mowerId)

        mowingSessionInterface.createMowingSession(mowerPositions, mowerId, function(error, mowingSessionId) {

            if (error.length == 0) {
                res.status(200).json(mowingSessionId)
            } else {
                res.status(400).json(error)
            }
        })
    })

    /* Add new positions to mowing session */
    router.put('/', function(req, res) {

        let mowingSessionId = parseInt(req.body.mowingSessionId)
        console.log("mowingSessionId: "+mowingSessionId)
        let mowerPositions = req.body.mowerPositions
        console.log("mowerPositions: "+mowerPositions)

        mowingSessionInterface.addMowerPositions(mowingSessionId, mowerPositions, function(error, theMowerPositions) {

            if (error.length == 0) {
                res.status(200).json(theMowerPositions)
            } else {
                res.status(400).json(error)
            }
        })
    })

    return router
}