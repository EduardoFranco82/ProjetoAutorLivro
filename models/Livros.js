
const mongoose = require('mongoose');




const LivroSchema = new mongoose.Schema({
    titulo: {
        type: String,
        require: true,
    },
    
    autor:{
        type: mongoose.Schema.Types.ObjectID, 
        ref : 'Autor',
        require: true,
    }
})
const Livro = mongoose.model('Livro' , LivroSchema);

module.exports = Livro;