    // Imports the Google Cloud client library
    const vision = require('@google-cloud/vision');

    // Creates a client
    const client = new vision.ImageAnnotatorClient({ keyFilename: "/backend-app/src/data-layer/vision-api/teak-truck-348313-4d9f82ccb123.json" });

    module.exports = function({}) {

        const exports = {}

        exports.defineImage = function(callback) {

            client.labelDetection('https://images.squarespace-cdn.com/content/v1/564b82fde4b09d9458f0692b/1551984039765-62R6PHBJX59UA5FANUZZ/Ferr-.488-Pista-comp+148.jpg')
                .then((results) => {
                    const labels = results[0].labelAnnotations
                    console.log('Labels:');
                    labels.forEach(label => console.log(label.description));

                    callback([], labels)

                })
                .catch((error) => callback(error, []));
        }

        return exports
    }