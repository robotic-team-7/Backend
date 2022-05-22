const aws = require('aws-sdk')
const multer = require('multer')
const multers3 = require('multer-s3')

module.exports = function({}) {

    const exports = {}

    /* Creates an S3 instance */
    const s3 = new aws.S3({
        accessKeyId: process.env.S3_ACCESS_KEY,
        secretAccessKey: process.env.S3_SECRET_KEY,
        region: process.env.S3_REGION

    })

    /* Uploads image to buffer */
    const multerMemoryStorage = multer.memoryStorage();

    const upload = multer({
        storage: multerMemoryStorage
    })

    exports.upload = upload


    /* Uploads image to S3 */
    exports.uploadS3 = function(req, callback) {

        const uploadParams = {
            Bucket: process.env.BUCKET_NAME,
            Body: req.file.buffer,
            Key: `obstacle-${Date.now()}.jpeg`
        }

        return s3.upload(uploadParams).promise()

    }



    return exports
}