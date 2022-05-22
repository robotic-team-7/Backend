    // Imports the Google Cloud client library
    const vision = require('@google-cloud/vision');

    // Creates a client
    const client = new vision.ImageAnnotatorClient({ keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS });

    module.exports = function({}) {

        const exports = {}

        //Defines the image and return a image classification
        exports.defineImage = function(imagePath, callback) {
            console.log(imagePath)
            client.labelDetection(imagePath)
                .then((results) => {
                    const labels = results[0].labelAnnotations
                    console.log('Labels:');
                    callback([], labels[0].description)

                })
                .catch((error) => callback(error, []));
        }

        return exports
    }