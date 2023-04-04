const {Router} = require('express');
const {allTemp} = require('../controllers/temperaments');
const router = Router();

router.get('/', async (req,res)=>{
    const temps = await allTemp();
    try {
        res.status(200).send(temps);
    } catch (error) {
        res.status(404).send(error.message);
    }
})

module.exports = router;