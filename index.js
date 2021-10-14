require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const app = express();


app.use( express.urlencoded({extended : true}));
app.use(express.json())

// rotas da API
const autorRoutes = require('./routes/autorRoutes')
app.use('/autor' , autorRoutes)

const livroRoutes = require('./routes/livroRoutes')
app.use('/livro',livroRoutes) 

const DB_USER = process.env.DB_USER
const DB_PASSWORD = encodeURIComponent (process.env.DB_PASSWORD)

mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@apicluster.alruq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`).then(()=>{
    console.log('conectado ao banco') 
    app.listen(3000) }).catch((err)=>console.log(err))


