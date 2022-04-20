module.exports = function({}) {

    const exports = {}



    exports.errorCheck = function(error, callback) {

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