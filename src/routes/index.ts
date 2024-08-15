import express from 'express';
import { readFile, writeFile } from 'fs/promises';

const dataSource = './data/list.txt';

const router = express.Router();

router.post('/contato', async(req, res) => {
    const {name} = req.body; // buscando a constante name no corpo da lista

    //condição para que isso aconteça
    if(!name || name.length < 2) {
        return res.json({error: 'Nome Precisa de pelo menos 2 caracteres.'});
    }
    // processamento dos dados
    let list: string[] = [];
    try{
        const data = await readFile(dataSource, { encoding: 'utf8'});
        list = data.split('\n');
        
    } catch(err) { }

    list.push(name);
    await writeFile(dataSource, list.join('/n'));

    res.status(201).json({ contato: name});
});
// Pegando lista de contatos
router.get('/contatos', async (req, res) => {
    let list: string[] = [];
    try{
        const data = await readFile(dataSource, { encoding: 'utf8'});
        list = data.split('\n');
        
    } catch(err) { }

    res.json( {contatos: list});
})
// Excluindo contato de uma lista
router.delete('/contato', async (req, res) => {
    const { name } = req.query;

    if(!name) { 
        return res.json( { error: 'O nome não encontra na lista'});
    }
    let list: string[] = [];
    try{
        const data = await readFile(dataSource, { encoding: 'utf8'});
        list = data.split('\n');
        
    } catch(err) { }

    list = list.filter(item => item.toLowerCase() !== (name as string).toLowerCase()); //O texto pode ser escrito em maiusculo ou minusculo

    await writeFile(dataSource, list.join('\n'));

    res.json( {contatos: list});
})


export default router;