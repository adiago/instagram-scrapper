const express = require('express');
const randomId = require('random-id');
const instagram = require('./scrapper-instagram');
const app = express(),
      bodyParser = require("body-parser");
      port = 3070;

// place holder for the data
const users = [
  {
    id: "1",
    firstName: "first1",
    lastName: "last1",
    email: "abc@gmail.com"
  },
  {
    id: "2",
    firstName: "first2",
    lastName: "last2",
    email: "abc@gmail.com"
  },
  {
    id: "3",
    firstName: "first3",
    lastName: "last3",
    email: "abc@gmail.com"
  }
];

app.use(bodyParser.json());
app.use(express.static(process.cwd() + '/my-app/dist'));

app.get('/api/users', (req, res) => {
  console.log('get instagram', req)
  const data = new Promise(function (resolve, reject) {
    instagram.instaData()
        .then(data => resolve(data))
        .catch(err => reject('Insta scrapper failed'))
  })
  data
    .then(function (msg) {
      console.log(msg)
      res.json(msg)
    })
      .catch(function (error) {
        console.log(error)
        res.json(error)
      })
})


// app.get('/api/users', (req, res) => {
//   console.log('get instagram', req.query.user)
//   let data = instagram.getInstaData(req.query.user)
//   res.json(data)
//   //console.log('api/users called!!!!!1111!!')
// });

app.post('/api/user', (req, res) => {
  console.log('get instagram', req.body.user)
  const data = new Promise(function (resolve, reject) {
    instagram.instaData(req.body.user)
        .then(data => resolve(data))
        .catch(err => reject('Insta scrapper failed'))
  })
  data
      .then(function (msg) {
        console.log(msg)
        res.json(msg)
      })
      .catch(function (error) {
        console.log(error)
        res.json(error)
      })
});

app.get('/', (req,res) => {
  res.sendFile(process.cwd() + '/my-app/dist/index.html');
});

app.listen(port, () => {
    console.log(`Server listening on the port::${port}`);
});