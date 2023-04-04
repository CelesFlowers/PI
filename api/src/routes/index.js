const { Router } = require('express');
const express = require('express')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const temperamentsRoutes = require("./temperamentsRoutes.js");
 const dogsRoutes = require("./dogsRoutes.js");


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/dogs", dogsRoutes)
router.use("/temperaments", temperamentsRoutes)


module.exports = router;


