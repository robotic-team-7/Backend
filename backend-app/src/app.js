const express = require("express")

const app = express()

app.get("/", function(request, response) {

    response.send("Backend-app is running!")

})

app.listen(8080)