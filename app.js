const express = require('express');
const mongoose = require('mongoose');
const app = express();
const Post = require('./models/Post');
require('dotenv').config()

//connectdb
mongoose.connect(process.env.CONNECTION_STRING)
// Uygulamamızda ejs modülünü kullanacağımızı belirtiyoruz
app.set('view engine', 'ejs');


//Middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


//Routes
app.get('/', async (req, res) => {
    const getPost = await Post.find({})
    res.render('index', {
        getPost
    });
})

app.get('/about', (req, res) => {
    res.render('about');
})

app.get('/add', (req, res) => {
    res.render('add_post');
})

app.get('/post/:id', async (req, res) => {
    const DATA = await Post.findById(req.params.id)
    res.render('post', { DATA });
})
app.post('/add', async (req, res) => {
    await Post.create(req.body)
    res.redirect("/")
});

const port = 3000;

app.listen(port, () => {
    console.log(`Server port ${port}'de başlatıldı`);
})

