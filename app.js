//MODULES
const express = require('express'), app = express();
const genres = require('./routes/generes');
// const dotenv = require('dotenv');
// dotenv.config();

//MIDDLEWARES
app.use(express.json());
app.use('/api/genres', genres);






//CREATESEREVR
const PORT = process.env.PORT || 3000
app.listen(PORT, ()=> console.log(`Server Listening on http://localhost:${PORT}`))