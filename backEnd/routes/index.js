import express from 'express';
import {register, login, createNewClient, getallClients, deleteClientById} from '../controllers/controllers.js';

const router = express.Router();

router.post('/login', login);
router.post('/register', register);

router.post('/newClient', createNewClient);
router.get('/clients', getallClients);
router.delete('/client/:id', deleteClientById);

export default router;