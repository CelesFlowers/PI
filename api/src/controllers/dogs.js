const axios = require('axios');
require('dotenv').config();
const {API_KEY} = process.env;
  const { Dog, Temperament} = require('../db');
  const { Op }=require("sequelize")
  const{get_allTemps}= require('./temperaments');
  

  const get_allDogsApi = async () => {
    const apiUrl = await axios.get (`https://api.thedogapi.com/v1/breeds`);
    const apiInfo = await apiUrl.data.map(el => {
        return {
            id: el.id,
            name: el.name,
           image: el.image.url,
           weight: el.weight.metric + " kg",
           height: el.height.metric + " cm",
           life_span: el.life_span,
           temperament: el.temperament,
           createdInDb: false  

        }
    })
    return apiInfo
  }

  const get_allDogsDb = async () => {
    const dbDogs =  await Dog.findAll({        
          include: [{
            model: Temperament,
            attributes: ["name"],
            through: {
              attributes: []
            }
          }]
        }
    )
    const formattedDogs = dbDogs?.map(dbDog => {
      return {
        id: dbDog.id,
        name: dbDog.name,
        weight: dbDog.weight,
        height: dbDog.height,
        life_span: dbDog.life_span,
        image:dbDog.image,
        createdInDb:dbDog.createdInDb,
        temperament: dbDog.temperaments?.map (temperament => temperament.name),
      }
    })
    return formattedDogs
  }

  const get_allDogs = async () => {
    const apiInfo = await get_allDogsApi()
    const dbInfo = await get_allDogsDb()
    const totalInfo = apiInfo.concat(dbInfo)
    return totalInfo
  }

  
    module.exports = { get_allDogsApi, get_allDogsDb, get_allDogs}

  