const {Router} = require('express');
const {getAllDogs} = require('../controllers/dogs.js');
const router = Router();
const{allTemp}= require('../controllers/temperaments');
const {Breed, Temperament} = require('../db.js');
const express = require('express')
const Sequelize = require ('sequelize')


router.get("/", async(req, res) => {//esta funcion también podra recibir un nombre por medio de query
    // const name = req.query.name;
    const  name  = req.query.name;
    const allDogs = await getAllDogs();
    if (name) {
        const dog = allDogs.filter(d => d.name.toLowerCase().includes(name.toLowerCase()));//si el perro existe guardame sus parametros aca.
        dog.length ? res.status(200).send(dog) : res.status(404).send("Breed not found"); 
    } else {
        res.status(200).send(allDogs);
    }
});

router.get("/:idRaza", async(req, res) => {//traer la info de un perro por su id, del modelo raza
    const { idRaza } = req.params;
    const allDogs = await getAllDogs();
    const dog = allDogs.filter(el => el.id == idRaza);
    if (dog.length) {
        res.status(200).json(dog);
    }else{
        res.status(404).send("ID not found");
    }
});

router.post("/", async (req, res) => {
        const {
         name,
         min_height,
         max_height,
         min_weight,
         max_weight,
         life_span,
         temperaments,
         image
        } = req.body
     
        const fixedHeight = []
        const minHeight = min_height;
        const maxHeight = max_height;
        fixedHeight.push(minHeight, maxHeight)
     
        const fixedWeight = []
        const minWeight = min_weight;
        const maxWeight = max_weight;
        fixedWeight.push(minWeight, maxWeight)
     
        const dog = await Breed.create({
         name,
         height: fixedHeight,
         weight: fixedWeight,
         life_span,
         image: image ? image : "https://www.sanantonio.gov/portals/0/Images/ACS/Pictures/adoptdontshop.jpg",
        })
     
        const associatedTemp = await Temperament.findAll({
            where: { name: temperaments},
        })
     
        dog.addTemperament(associatedTemp);
     
        res.status(200).send("Breed created succesfully!")
    })
    
    router.use(express.json());
    

router.use(express.json());
  
module.exports = router;