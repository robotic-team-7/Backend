const express = require("express")
const bodyParser = require('body-parser');
const mobileRouter = require("./mobile/mobile-router");
const app = express()


module.exports = function({ mobileRouter }) {
    app.use(bodyParser.json())


    app.get("/", function(request, response) {
        response.send("Backend is working!")
    })



    app.use('/rest', restRouter)
    app.use('/mowers', mowerRouter)
    app.use('/images', imageRouter)
    app.use('/positions', positionsRouter)
    app.use('/mobile', mobileRouter)

    let bodyParser = require('body-parser')
    app.use(bodyParser.urlencoded({ extended: false }))


    return app
}