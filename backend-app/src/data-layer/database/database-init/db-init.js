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
        mowerId: {
            primaryKey: true,
            autoIncrement: true,
            type: DataTypes.INTEGER,
            unique: true,
            allowNull: false
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        serialNumber: {
            unique: true,
            type: DataTypes.STRING,
            allowNull: false
        },
        status: {
            primaryKey: true,
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
    }, {
        timestamps: false
    });

    /* Creates table Positions */
    const Positions = sequelize.define('Positions', {
        positionsId: {
            primaryKey: true,
            autoIncrement: true,
            type: DataTypes.INTEGER,
            unique: true,
            allowNull: false
        },
        positions: {
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
        pictureId: {
            primaryKey: true,
            autoIncrement: true,
            type: DataTypes.INTEGER,
            unique: true,
            allowNull: false
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        imageClassification: {
            primaryKey: true,
            type: DataTypes.STRING,
            allowNull: false
        },
        path: {
            primaryKey: true,
            type: DataTypes.STRING,
            allowNull: false
        },
    }, {
        timestamps: false
    });

    /* Table relations */

    // Adds mowerId to Pictures table
    Pictures.belongsTo(Mowers, { foreignKey: 'mowerId', onDelete: 'cascade' })

    // Adds mowerId to Position table
    Positions.belongsTo(Mowers, { foreignKey: 'mowerId', onDelete: 'cascade' })


    /* Syncs all tables with the databse */
    sequelize.sync({ force: true }).then(function() {

        Mowers.create({
            userId: 1,
            serialNumber: "abc123",
            status: false
        })
        Positions.create({
            mowerID: 1,
            positions: {
                points: [
                    [53.33, 44.33],
                    [66.44, 56.77]
                ]

            }
        })
    })

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