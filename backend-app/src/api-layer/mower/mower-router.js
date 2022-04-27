/* Mower API router */

const express = require("express")

module.exports = function({ mowerInterface }) {

    const router = express.Router()

    /* Update mower status */
    router.put('/:mowerId', function(req, res) {

        let mowerId = parseInt(req.params.mowerId)
        let status = Boolean(req.body.newStatus)

        /* Call mowerInterface to update mower status */
        mowerInterface.updateMowerStatus(mowerId, status, function(error, newMowerStatus) {

            if (error.length == 0) {
                res.status(200).json(newMowerStatus)
            }
            else if (newMowerStatus != status) {
               res.status(400).json(error)
            }
            else {
                res.status(500).json(error)
            }
        })
    })

    return router
}