const express = require('express');
const cors = require('cors');
const {json, urlencoded} = require("express");
const app = express();

app.use(cors({
    credentials: true,
    origin: 'http://localhost:5174'
}))

app.use(json()) // for parsing application/json
app.use(urlencoded({ extended: true }))

app.get('/test', (req,res) => {
    res.json('test ok');
});

app.post('/login', (req, res) => {
    const{email, password} = req.body;
    if(email && password) {
        res.json('login successful')
    }
})

app.listen(3000, () => {
    console.log(`Server is running on port 3000`);
});