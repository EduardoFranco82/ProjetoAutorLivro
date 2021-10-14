const router = require('express').Router();
const Livro = require('../models/Livros');

router.post('/', async (req, res) => {

    const { titulo, autor } = req.body;
    if (!titulo || !autor) {
        res.status(422).json({ message: 'titulo e autor obrigatório' })
        return
    }
    const livro = {
        titulo,
        autor,
    }
    try {
        await Livro.create(livro)
        res.status(201).json({ mensagem: 'livro criado com sucesso' })

    } catch (err) {
        res.status(500).json({ error: err })
    }
})


router.get('/', async (req, res) => {
    try {
        const livro = await Livro.find().populate('autor')
        res.status(200).json(livro)

    } catch (err) {
        res.status(500).json({ error: err })
    }
})

router.get('/:id', async (req, res) => {

    const id = req.params.id
    try {
        const livro = await Livro.findOne({ _id: id })
        if (!livro) {
            res.status(422).json({ message: ' o livro não foi encontrado' })
            return
        }
        res.status(200).json(autor)

    } catch (err) {
        res.status(500).json({ error: err })
    }
})

router.patch('/:id', async (req, res) => {
    const id = req.params.id
    const { titulo, autor } = req.body
    const livro = {
        titulo,
        autor,
    }
    try {
        const atualizarLivro = await Livro.updateOne({ _id: id }, livro)
        if (atualizarLivro.matchedCount === 0) {
            res.status(422).json({ message: ' o livro não foi encontrado' })
            return
        }
        res.status(200).json(livro)

    } catch (err) {
        res.status(500).json({ error: err })
    }


})

router.delete('/:id', async (req, res) => {
    const id = req.params.id
    const livro = await Livro.findOne({ _id: id })

    if (!livro) {
        res.status(422).json({ message: ' o livro não foi encontrado' })
        return
    } if (livro.autor) {
        res.status(204).json({ message: 'Este livro possui autor, nao pode ser excluido' })
        return
    }
    try {
        await Livro.deleteOne({ _id: id })
        res.status(200).json({ message: ' Livro excluido com sucesso' })
    }

    catch (err) {
        res.status(500).json({ error: err })
    }

})

module.exports = router