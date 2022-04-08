/* Rest api, file included to keep folder on git*/
const express = require("express")

module.exports = function({}) {

    const router = express.Router()

    router.get('/:id', function(req, res) {
        const moverID = request.paramas.id
        if (errors.length == 0) {
            response.status(404).end()
        } else if (errors.length == 0) {
            response.status(200).json(reservation)
        } else {
            response.status(500).json(errors)
        }
    })

    router.post('/', function(req, res) {
        if (errors.length > 0) {
            response.status(400).json(errors)
        } else if (reservation) {
            response.status(201).json(reservation)
        } else {
            response.status(500).json(errors)
        }
    })



    return router
}