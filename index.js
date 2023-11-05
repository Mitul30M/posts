
const express = require('express');
const { v4: uuid } = require('uuid');
const path = require('path');
const methodOverride = require('method-override');

const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));



let data = [];



app.get('/posts', (req, res) => {
    res.render('main', { data });
})


app.get('/posts/new', (req, res) => {
    res.render('new');
})


app.post('/posts', (req, res) => {
    const { postTitle, postDesc, postBanner } = req.body;
    const id = uuid();
    data.push({ id, postTitle, postBanner, postDesc });
    res.redirect('/posts');
})



app.get('/posts/:id', (req, res) => {
    const { id } = req.params;
    const foundPost = data.find(c => c.id == id);
    res.render('show', { ...foundPost });
})



app.get('/posts/:id/edit', (req, res) => {
    const { id } = req.params;
    const foundPost = data.find(c => c.id == id);
    res.render('edit', { ...foundPost });

})


app.patch('/posts/:id', (req, res) => {
    const { id } = req.params;
    const { newTitle, newDesc, newBanner } = req.body;
    const foundPost = data.find(c => c.id == id);

    foundPost.postTitle = newTitle;
    foundPost.postDesc = newDesc;
    foundPost.postBanner = newBanner;
    res.redirect(`/posts`);
})


app.delete('/posts/:id', (req, res) => {
    const { id } = req.params;
    data = data.filter(c => c.id != id);
    res.redirect('/posts');
})

app.listen(3030, () => {
    console.log("/posts is live on port:3030");
});