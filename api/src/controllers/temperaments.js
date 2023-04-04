const axios = require('axios');
const { MY_API_KEY } = process.env;
const { Temperament } = require('../db')

const allTemp = async () => {
const temperamentsApi = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${MY_API_KEY}`);
    const temperaments = temperamentsApi.data.map(t => t.temperament);
    const temps = temperaments.toString().split(",");
    temps.forEach(el => {
        let i = el.trim()
        Temperament.findOrCreate({
             where: { name: i }
        })
    })

    const findTemp = await Temperament.findAll();    
    return findTemp


}

module.exports = { allTemp };