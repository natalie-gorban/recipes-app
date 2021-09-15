const express = require('express');
const app = express();
const cors = require('cors');
const db = require("./app/models");
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))


const port = process.env.PORT || 5000

app.listen(port, () => console.log(`Listening on port ${port}`));

if (process.env.FORCE_RESYNC === 'true') {
  console.log(`start force to resync DB due FORCE_RESYNC=[${process.env.FORCE_RESYNC}]`)
  db.sequelize.sync({force: true}).then(() => {
    console.log('Drop and Resync Db');
  });
} else {
  console.log('sync db')
  db.sequelize.sync();
}
// // for dev drop and resync

app.get('/healthz', (req, res) => {
  console.log('/healthz get request')
  res.send({ express: 'Backend is online' });
});

require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
