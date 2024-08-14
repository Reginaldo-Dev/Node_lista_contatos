import express from 'express';

const router = express.Router();

router.post('/contato', (req, res) => {
    const {name} = req.body; // buscando a constante name no corpo da lista

    //condição para que isso aconteça
    if(!name || name.length < 2) {
        return res.json({error: 'Nome Precisa de pelo menos 2 caracteres.'});
    }
    // processamento dos dados

    res.status(201).json({ contato: name});
})






export default router;