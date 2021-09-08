const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))


const port = process.env.PORT || 5000

app.listen(port, () => console.log(`Listening on port ${port}`));

app.get('/healthz', (req, res) => {
  console.log('/healthz get request')
  res.send({ express: 'Backend is online' });
});

app.get('/api/test/all', (req, res) => {
  console.log('/api/test/all get request')
  res.send({ express: 'Backend is online' });
});

app.get('/api/test/user', (req, res) => {
  console.log('/api/test/user get request')
  res.send({ express: 'Backend is online' });
});

app.get('/api/test/admin', (req, res) => {
  console.log('/api/test/admin get request')
  res.send({ express: 'Backend is online' });
});

app.post('/api/auth/signin', (req, res) => {
  console.log('POST /api/auth/signin post request:', req.body)
  res.send({user: 'test'})
})

app.post('/api/auth/signup', (req, res) => {
  console.log('POST /api/auth/signup post request:', req.body)
  res.send({user: 'test'})
})
