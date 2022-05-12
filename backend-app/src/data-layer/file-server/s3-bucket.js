const aws = require('aws-sdk')
const multer = require('multer')
const multers3 = require('multer-s3')

module.exports = function({}) {

    const exports = {}

    /* Creates an S3 instance */
    const imageStorage = new aws.S3({
        accessKeyId: process.env.S3_ACCESS_KEY,
        secretAccessKey: process.env.S3_SECRET_KEY,
        region: process.env.S3_REGION

    })

    /* Uploads image to S3 */
    const upload = multer({
        storage: multers3({
            s3: imageStorage,
            bucket: process.env.BUCKET_NAME,
            metadata: function(req, file, cb) {
                cb(null, { fieldname: file.fieldname })
            },
            key: function(req, file, cb) {
                cb(null, `obstacle-${Date.now()}.jpeg`)
            }
        })
    })

    exports.upload = upload



    return exports
}