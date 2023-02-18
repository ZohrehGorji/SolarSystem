const express = require('express');
const Model = require('../models/model');
const router = express.Router();
/**
 * @swagger
 * components:
 *   schemas:
 *     Planet:
 *       type: object
 *       required:
 *         - name
 *         - size
 *         - distance_to_sun
 *       properties:
 *         name:
 *           type: string
 *           description: name of the planet
 *         size:
 *           type: number
 *           description: size of the planet
 *         distance_to_sun:
 *           type: number
 *           description: distance of the planet to sun
 *       example:
 *         name: Earth
 *         size: 6371
 *         distance_to_sun: 93000000
 */
/**
 * @swagger
 * /addPlanet:
 *   post:
 *     summary: add a new planet
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Planet'
 *     responses:
 *       200:
 *         description: adds a planet
 *       500:
 *          description: error
 */
router.post('/addPlanet', async (req, res) => {
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

/**
 * @swagger
 * /getAll:
 *   get:
 *     summary: get a list of all saved planets
 *     requestBody:
 *     tags: ['Read Operation']
 *     responses:
 *       200:
 *         description: the list of all planets
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *       500:
 *          description: error
 */
router.get('/getAll', async (req, res) => {
    try {
        const data = await Model.find();
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

/**
 * @swagger
 * /getOne/{id}:
 *   get:
 *     summary: Returns the planet
 *     parameters:
 *        - in: path
 *          name: id
 *          schema:
 *              type: string
 *              required: true
 *          description: id to find the planet
 *     tags: ['Read Operation']
 *     responses:
 *       200:
 *         description: Returns the planet
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  _id:
 *                      type: string
 *                      description: id that is auto generated in database
 *                  name:
 *                      type: string
 *                      description: name of the planet
 *                  size:
 *                      type: number
 *                      description: size of the planet
 *                  distance_to_sun:
 *                      type: number
 *                      description: distance to sun
 *       404:
 *          description: planet not found
 *       500:
 *          description: server error
 */
router.get('/getOne/:id', async (req, res) => {
    try {
        const data = await Model.findById(req.params.id);
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

/**
 * @swagger
 * /getDistance/{firstPlanetId}/{secondPlanetId}:
 *   get:
 *     summary: Returns the distance between two planets
 *     parameters:
 *        - in: path
 *          id: firstPlanetId
 *          schema:
 *              type: string
 *              required: true
 *          description: id to find the first planet
 *        - in: path
 *          id: secondPlanetId
 *          schema:
 *              type: string
 *              required: true
 *          description: id to find the first planet
 *     tags: ['Read Operation']
 *     responses:
 *       200:
 *         description: Returns the distance of two planets
 *         content:
 *           application/json:
 *             schema:
 *               type: number
 *               properties:
 *                  distance_to_sun:
 *                      type: number
 *                      description: distance to sun
 *       404:
 *          description: planet not found
 *       500:
 *          description: server error
 */
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

/**
 * @swagger
 * /update/{id}:
 *   patch:
 *     summary: update a planet
 *     parameters:
 *        - in: path
 *          name: id
 *          schema:
 *              type: string
 *              required: true
 *          description: id to find the planet
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Planet'
 *     responses:
 *       200:
 *         description: Returns the distance of two planets
 *         content:
 *           application/json:
 *             schema:
 *               type: number
 *               properties:
 *                  distance_to_sun:
 *                      type: number
 *                      description: distance to sun
 *       404:
 *          description: planet not found
 *       500:
 *          description: server error
 */
router.patch('/update/:id', async (req, res) => {
    try {
        console.log(req.body);
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

/**
 * @swagger
 * /delete/{id}:
 *   delete:
 *     summary: deletes the planet with given id
 *     parameters:
 *        - in: path
 *          name: id
 *          schema:
 *              type: string
 *              required: true
 *          description: id to find the planet
 *     tags: ['Delete Operation']
 *     responses:
 *       200:
 *         description: deletes the planet
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       404:
 *          description: planet not found
 *       500:
 *          description: server error
 */
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

/**
 * @swagger
 * /deleteAll:
 *   delete:
 *     summary: deletes all planets
 *     tags: ['Delete Operation']
 *     responses:
 *       200:
 *         description: deletes the planets
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       404:
 *          description: something went wrong
 *       500:
 *          description: server error
 */
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