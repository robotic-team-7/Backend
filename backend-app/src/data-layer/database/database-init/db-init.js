/* initilaizes the database */
const { Sequelize, DataTypes } = require('sequelize');

/* Establishes connection with the database */
const sequelize = new Sequelize('postgres://postgres:mower123@local-db:5432/mower')

/* Checks if the connection was successful */
try {

    sequelize.authenticate();
    console.log('Connection has been established successfully.');

    /* Creates table Mowers */
    const Mowers = sequelize.define('Mowers', {
        MowerID: {
            primaryKey: true,
            autoIncrement: true,
            type: DataTypes.INTEGER,
            unique: true,
            allowNull: false
        },
        UserID: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        SerialNumber: {
            unique: true,
            type: DataTypes.STRING,
            allowNull: false
        },
        Status: {
            primaryKey: true,
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
    }, {
        timestamps: false
    });

    /* Creates table Positions */
    const Positions = sequelize.define('Positions', {
        PositionsID: {
            primaryKey: true,
            autoIncrement: true,
            type: DataTypes.INTEGER,
            unique: true,
            allowNull: false
        },
        Positions: {
            type: DataTypes.JSON,
            allowNull: false
        },
    }, {
        timestamps: true,
        createdAt: true,
        updatedAt: false,
        deletedAt: false,
    });

    /* Creates table Pictures */
    const Pictures = sequelize.define('Pictures', {
        PictureID: {
            primaryKey: true,
            autoIncrement: true,
            type: DataTypes.INTEGER,
            unique: true,
            allowNull: false
        },
        UserID: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        ImageClassification: {
            primaryKey: true,
            type: DataTypes.STRING,
            allowNull: false
        },
        Path: {
            primaryKey: true,
            type: DataTypes.STRING,
            allowNull: false
        },
    }, {
        timestamps: false
    });

    /* Table relations */

    // Adds MowerID to Pictures table
    Pictures.belongsTo(Mowers, { foreignKey: 'MowerID', onDelete: 'cascade' })

    // Adds MowerID to Position table
    Positions.belongsTo(Mowers, { foreignKey: 'MowerID', onDelete: 'cascade' })


    /* Syncs all tables with the databse */
    sequelize.sync({ force: true });

    /* Exports the tables so they are accessable for the database-iterface files */
    module.exports = function({}) {

        /* Tables to export */
        const exports = { Mowers, Positions, Pictures }
        return exports
    }


} catch (error) {
    /* Prints error in the console if connection to the database fails */
    console.error('Unable to connect to the database:', error);
}