import express from 'express';
import { createContact, deleteContact, getContacts } from '../services/contacts';


const router = express.Router();

router.post('/contato', async(req, res) => {
    const {name} = req.body; // buscando a constante name no corpo da lista

    //condição para que isso aconteça
    if(!name || name.length < 2) {
        return res.json({error: 'Nome Precisa de pelo menos 2 caracteres.'});
    }
    
    await createContact(name);

    res.status(201).json({ contato: name});
});
// Pegando lista de contatos
router.get('/contatos', async (req, res) => {
    let list = await getContacts();

    res.json( {contatos: list});
})
// Excluindo contato de uma lista
router.delete('/contato', async (req, res) => {
    const { name } = req.query;

    if(!name) { 
        return res.json( { error: 'O nome não encontra na lista'});
    }

    await deleteContact(name as string);

    res.json( {contatos: list});
})


export default router;
