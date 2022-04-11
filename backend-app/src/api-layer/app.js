const express = require("express")
const app = express()



module.exports = function({ restRouter, mowerRouter, imageRouter, positionRouter }) {

    app.get("/", function(request, response) {

        response.send("Backend is working!")

    })


    app.use('/rest', restRouter)
    app.use('/mowers', mowerRouter)
    app.use('/images', imageRouter)
    app.use('/positions', positionRouter)

    let bodyParser = require('body-parser')
    app.use(bodyParser.urlencoded({ extended: false }))

    return app
}