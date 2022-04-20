module.exports = function({}) {

    const exports = {}

    const {
        UniqueConstraintError,
        ForeignKeyConstraintError
    } = require('sequelize')


    /* Catches erros from the database and return system specific error code */
    exports.errorCheck = function(error, callback) {
        console.log(error)
        switch (error.constructor) {
            case UniqueConstraintError:
                callback(['dbUniqueConstraintError'])
                break;
            case ForeignKeyConstraintError:
                callback(['dbForeignKeyConstraintError'])
                break;
            default:
                callback(['dbError'])
                break;
        }


    }


    return exports
}