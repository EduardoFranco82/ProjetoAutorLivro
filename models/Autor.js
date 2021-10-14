
const mongoose = require('mongoose');
const AutorSchema = new mongoose.Schema({
    
    
    nome: {
        type: String,
        require: true,
    },
   
    livro:[{
        type: mongoose.Schema.Types.ObjectID, 
        ref : 'Livro',
        
    }]
})

const Autor = mongoose.model('Autor' , AutorSchema);

module.exports = Autor;