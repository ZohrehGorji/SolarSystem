const express = require('express');
const Model = require('../models/model');
const router = express.Router();

//Post Method
router.post('/post', async (req, res) => {
    const data = new Model({
        name: req.body.name,
        size: req.body.size,
        distance_to_sun : req.body.distance_to_sun
    })

    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

//Get all Method
router.get('/getAll', async (req, res) => {
    try {
        const data = await Model.find();
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//Get by ID Method
router.get('/getOne/:id', async (req, res) => {
    try {
        const data = await Model.findById(req.params.id);
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})
//Get distance between two planet
router.get('/getDistance/:firstPlanetId/:secondPlanetId', async (req, res) => {
    try {
        console.log(req.params.secondPlanetId);

        const firstPlanet = await Model.findById(req.params.firstPlanetId);

        const secondPlanet = await Model.findById(req.params.secondPlanetId);
        const difference= Math.abs(firstPlanet.distance_to_sun - secondPlanet.distance_to_sun)
        res.json(difference)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//Update by ID Method
router.patch('/update/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        const result = await Model.findByIdAndUpdate(
            id, updatedData, options
        )

        res.send(result)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//Delete by ID Method
router.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Model.findByIdAndDelete(id)
        res.send(`Document with ${data.name} has been deleted..`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})
//Delete All
router.delete('/deleteAll', async (req, res) => {
    try {
        const data = await Model.deleteMany()
        res.send(`database reset`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

module.exports = router;