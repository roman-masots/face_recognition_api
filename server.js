const express = require('express');
const bodyPraser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');
const knex = require('knex');

// For dependency injections:
const signin = require('./controllers/signin');
const register = require('./controllers/register');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'postgres',
        password: 'tere',
        database: 'face-recognition'
    }
});

const app = express();
app.use(bodyPraser.json());
app.use(cors());

// Sign In
app.post('/signin', signin.handleSignIn(db, bcrypt))

// Register
app.post('/register', register.handleRegister(db, bcrypt))

// Get user profile
app.get('/profile/:id', profile.handleProfile(db))

// Updating user entries
app.put('/image', image.handleImage(db))

// Hiding API key from front to back-end
app.post('/imageurl', (req, res) => image.handleApiCall(req, res))

app.listen(3001, () => console.log('listening port 3001'))