const express = require('express')
const app = express()
const path = require('path')
const fs = require('fs')

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
  fs.readdir(`./file`, function (err, file) {
    res.render("index", { files: file });
  })
})

app.get('/files/:filename', function (req, res) {
  fs.readFile(`./file/${req.params.filename}`, "utf-8", function (err, filedata) {
    res.render('page', { filename: req.params.filename, filedata: filedata });
  });
});

app.post('/create', function (req, res) {
  fs.writeFile(`./file/${req.body.title.split(' ').join('')}.txt`, req.body.details, function (err) {
    res.redirect('/');
  })
})

app.get('/edit/:filename', function (req, res) {
  res.render('edit', { filename: req.params.filename });
})

app.post('/edit', function (req, res) {
  fs.rename(`./file/${req.body.oldname}`, `./file/${req.body.newname}.txt`, function (err) {
    res.redirect('/');
  })
})

app.listen(3000);