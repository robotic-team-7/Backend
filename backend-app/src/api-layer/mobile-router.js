/* Rest api, file included to keep folder on git*/
const express = require("express")

module.exports = function({ mooverInterface }) {

    const router = express.Router()

    /* router.get('/', async function(request, response) {
         mooverInterface. (function(error, moovers) {
             if (error.length == 0 && moovers.length == 0) {
                 response.status(404).end()
             } else if (error.length == 0) {
                 response.status(200).json(moovers)
             } else {
                 response.status(500).json(error)
             }
         })
     })
     

    router.get('/:id', function(request, response) {

        const id = request.params.id
        mooverInterface. (id, function(errors, moover) {
            if (errors.length == 0 && moover.length == 0) {
                response.status(404).end()
            } else if (errors.length == 0) {
                response.status(200).json(moover)
            } else {
                response.status(500).json(errors)
            }
        })
    })
    */

    router.post('/', function(request, response) {
            const userID = request.body.UserID
            const serialNumber = request.body.SerialNumber
            const status = request.body.Status
            mooverInterface.createMoover(userID, serialNumber, status, function(error, MooverID) {
                if (error.length == 0) {
                    response.status(201).json(MooverID)
                } else {
                    response.status(404).end()
                }
            })
        })
        /*
            router.delete('/:id', (request, response) {
                
            })

            router.put('/:id', function (request, response) {
                
            })
        */
    return router
}