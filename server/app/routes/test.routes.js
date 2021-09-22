module.exports = (app) => {
  app.post("/api/test", (req, res) => {
    console.log('test body', req.body)
    res.send('OK')
  });

};
