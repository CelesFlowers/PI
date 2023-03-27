const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => { 
  // defino el modelo sequelize.define(modelName, attributes, options)
  sequelize.define('temperament', { //en minuscula nos da la data enviada al front de ese atributo
    //no ponemos el id, sequelize lo haca automatico
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
  }, //{ freezeTableName: true }
  );
};
