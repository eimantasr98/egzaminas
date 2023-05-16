import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../models/Users.js';
import Client from '../models/Clients.js';

dotenv.config();

export async function register(req, res) {
    try {
        const {userName, password} = req.body;
        const user = await User.findOne({userName: userName});

        if(user) {
            res.status(400).json({message: 'User already exists'});
            return
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({userName, password: hashedPassword});

        await newUser.save();

        res.status(201).json({message: 'user created'});

    } catch (error) {
        res.status(500).json({message: 'internal server error'});
    }
}

export async function login(req, res) {
    try {
        const {userName, password} = req.body;
        const user = await User.findOne({userName: userName});

        if(!user) {
            res.status(400).json({message: 'User does not exist'});
            return
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if(!isPasswordValid) {
            res.status(400).json({message: 'invalid password'});
            return
        }

        const token = jwt.sign({id: user.id}, process.env.JWT_SALT, {expiresIn: '3h'});

        res.status(200).json({token});

    } catch (error) {
        res.status(500).json({message: 'internal server error'});
    }
}

export async function createNewClient(req, res) {
    try {
        const {name, surname, email, phone} = req.body;
        const newClient = new Client({name, surname, email, phone});
        await newClient.save();
        res.status(202).json({message: 'added new client'});

    } catch (error) {
        res.status(500).json({message: 'internal server error'});
    }
}

export async function getallClients(req, res) {
    try {
        const clients = await Client.find();
        res.json(clients);
    } catch (error) {
        res.status(500).json({message: 'internal server error'});
    }
}

export async function deleteClientById(req, res) {
    try {
        const {id} = req.body;
        const clients = await Client.deleteOne(id);
        res.json(clients);
    } catch (error) {
        res.status(500).json({message: 'internal server error'});
    }
}