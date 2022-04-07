const express = require("express")
const bodyParser = require('body-parser');
const app = express()


module.exports = function({ moverRouter }) {
    app.use(bodyParser.json())


    app.get("/", function(request, response) {
        response.send("Backend is working!")
    })


    app.use('/mover', moverRouter)



    return app
}