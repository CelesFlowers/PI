
const { Breed, Temperament } = require('../db');
const { MY_API_KEY } = process.env;
const express = require('express');
const axios = require('axios');
const { Router } = require('express');
const Sequelize = require ('sequelize')

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
let urLink = `https://api.thedogapi.com/v1/breeds?api_key=${MY_API_KEY}`

const getApiData = async() => {
    
    const apiData = await axios.get(urLink);
    const apiInfo = await apiData.data.map(el => {
    let temperamentArray = [];
    if (el.temperament) {//pregunto que exista el temperamento y lo devuelvo en un arreglo
        temperamentArray = el.temperament.split(", ");
    }
    
    let heightArray = [];
    if (el.height.metric) {
        heightArray = el.height.metric.split(" - ");
    }

    let weightArray = [];
    if (el.weight.metric) {
        weightArray = el.weight.metric.split(" - ");
    }
        return {
            id: el.id,
            name: el.name,
            height: heightArray,
            weight: weightArray,
            temperaments: temperamentArray,
            life_span: el.life_span,
            image: el.image.url,
            createdInDb: false,
        }
    })
return apiInfo;
}

//-- Get data from the database posgrest--//

const getFromDb = async () => {
    let dogDB =  await Breed.findAll({        
          include: {
            model: Temperament,
            attributes: ["name"],
            through: {
              attributes: []
            }
          }
          
        }
    )

    const tempDB = dogDB.map((el) => {
        return {
            id: el.id,
            name: el.name,
            height: el.height,
            weight: el.weight,
            life_span: el.life_span + ' years',
            image: el.image,
            createdInDb: true,
            temperaments: el.temperaments?.map(temperaments => temperaments.name),
       
        
        };
        });
    
        return tempDB
    
}
//combine data from API and database
const getAllDogs = async () => {
    const dataFromApi = await getApiData();
    const dataFromDb = await getFromDb();
    // const allDataMixed = dataFromApi.concat(dataFromDb);
    
    const allDataMixed = [...dataFromApi, ...dataFromDb];
    return allDataMixed;
}

module.exports = { getAllDogs, getFromDb, getApiData};