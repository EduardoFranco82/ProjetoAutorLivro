const router = require('express').Router();
const Autor = require('../models/Autor');

router.post('/', async (req, res) => {

    const { nome, livro } = req.body;
    if (!nome) {
        res.status(422).json({ message: 'nome  obrigatório' })
        return
    }
    const autor = {
        nome,
        livro 
       }
    try {
        await Autor.create(autor)
        res.status(201).json({ mensagem: 'autor criado com sucesso' })

    } catch (err) {
        res.status(500).json({ error: err })
    }
})


router.get('/', async (req, res) => {
    try {
        const autor = await Autor.find().populate('livro')
        res.status(200).json(autor)

    } catch (err) {
        res.status(500).json({ error: err })
    }
})

router.get('/:id', async (req, res) => {

    const id = req.params.id
    try {
        const autor = await Autor.findOne({ _id: id })
        if (!autor) {
            res.status(422).json({ message: ' o autor não foi encontrado' })
            return
        }
        res.status(200).json(autor)

    } catch (err) {
        res.status(500).json({ error: err })
    }
})



router.patch('/:id', async (req, res) => {
    const id = req.params.id
    const { nome, livro } = req.body
    const autor = {
        nome,
        livro
    }
    try {
        const atualizarAutor = await Autor.updateOne({ _id: id }, autor)
        if (atualizarAutor.matchedCount === 0) {
            res.status(422).json({ message: ' o autor não foi encontrado' })
            return
        }
        res.status(200).json(autor)

    } catch (err) {
        res.status(500).json({ error: err })
    }


})

router.delete('/:id', async (req, res) => {
    const id = req.params.id
    const autor = await Autor.findOne({ _id: id })

    if (!autor) {
        res.status(422).json({ message: ' o autor não foi encontrado' })
        return
    }
    try {
        await Autor.deleteOne({ _id: id })
        res.status(200).json({ message: ' Autor excluido com sucesso' })
    }

    catch (err) {
        res.status(500).json({ error: err })
    }

})
module.exports = router