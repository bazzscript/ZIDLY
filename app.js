//MODULES
const http = require('http'), https = require('https');
const express = require('express'), app = express();
const Joi = require('joi')

app.use(express.json());

const genres = [
    {id: 1, genre: 'Comedy'},
    {id: 2, genre: 'Romance'},
    {id: 3, genre: 'Drama'}
];

app.get('/api/genres', (req, res)=>{
    res.send(genres)
})

// RETURN APARTICULAR GENRE WITH A PARTICULAR ID
app.get('/api/genres/:id', (req, res) => {
    //CHECK IF GENRE EXIST
    const genre = genres.find(c => c.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send('The genre with the given ID was not found.');

    res.send(genre);
  });

// CREATE GENRE
app.post('/api/genres', (req, res) => {
    // Check if request parameters is/are correct
    const {error} = validateGenre(req.body);
    if (error){
        return res.status(400).send(error.details[0].message);
    }
    const genre ={
        id: genres.length + 1,
        genre: req.body.genre
    };
    courses.push(genre);
    res.send(genre)
})

// UPDATE GENRE
app.put('/api/genre/:id', (req, res) => {
    // Check if genre exist
    const genre = genres.find(g => {g.id === parseInt(req.params.id)})
    if(!genre){
        return res.status(404).send(' The genre with the given ID was not found')
    };
    // Check if request parameters is/are correct
    const {error} = validateGenre(req.body);
    if (error){
        return res.status(400).send(error.details[0].message);
    }
    genre.genre = req.body.genre;
    res.send(genre);
})

// DELETE GENRE
app.delete('/api/genres/:id', (req, res) => {
    // Check if course exist
    const genre = genres.find(g => {g.id === parseInt(req.params.id)})
    if(!genre){
        return res.status(404).send(' The genre with the given ID was not found')
    };

    const index = genres.indexOf(genre);
    genres.splice(index, 1);
    res.send(genre)
})



function validateGenre(genre) {
    const schema ={
        genre: Joi.string().min(3).required()
    };
    return Joi.validate(genre, schema);
}

//CREATESEREVR
const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=> console.log(`Server Listening on http://localhost:${PORT}`))
// http.createServer(app).listen(PORT, ()=> console.log(`Server Listening on http://localhost:${PORT}`));
// https.createServer(app).listen(PORT, ()=> console.log(`Listening on Secured Encrypted Server https://localhost:${PORT}`));