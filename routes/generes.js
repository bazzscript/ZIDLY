const express = require('express');
const router = express.Router();
const Joi = require('joi');


const genres = [
    { id: 1, genre: 'Comedy' },
    { id: 2, genre: 'Romance' },
    { id: 3, genre: 'Drama' }
];

router.get('/', (req, res) => {
    res.send(genres)
})

// RETURN APARTICULAR GENRE WITH A PARTICULAR ID
router.get('/:id', (req, res) => {
    //CHECK IF GENRE EXIST
    const genre = genres.find(c => c.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send('The genre with the given ID was not found.');

    res.send(genre);
});

// CREATE GENRE
router.post('/', (req, res) => {
    // Check if request parameters is/are correct
    const { error } = validateGenre(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    const genre = {
        id: genres.length + 1,
        genre: req.body.genre
    };
    courses.push(genre);
    res.send(genre)
})

// UPDATE GENRE
router.put('/:id', (req, res) => {
    // Check if genre exist
    const genre = genres.find(g => { g.id === parseInt(req.params.id) })
    if (!genre) {
        return res.status(404).send(' The genre with the given ID was not found')
    };
    // Check if request parameters is/are correct
    const { error } = validateGenre(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    genre.genre = req.body.genre;
    res.send(genre);
})

// DELETE GENRE
router.delete('/:id', (req, res) => {
    // Check if course exist
    const genre = genres.find(g => { g.id === parseInt(req.params.id) })
    if (!genre) {
        return res.status(404).send(' The genre with the given ID was not found')
    };

    const index = genres.indexOf(genre);
    genres.splice(index, 1);
    res.send(genre)
})


function validateGenre(genre) {
    const schema = {
        genre: Joi.string().min(3).required()
    };
    return Joi.validate(genre, schema);
}

module.exports = router;