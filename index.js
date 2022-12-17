const express = require('express');
const translate = require('@iamtraction/google-translate');

const app = express();

// Parse JSON payload of the request
app.use(express.json());


// Add a GET route to translate text using a query parameter
app.get('/translate', (req, res) => {
    const { text, to } = req.query;
  
    if (!text || !to) {
      res.status(400).send({ error: 'Missing required parameters' });
      return;
    }
  
    translate(text, { to }).then(result => {
      res.send({ text: result.text });
    }).catch(err => {
      res.status(500).send({ error: err.message });
    });
  });
  


// Add a POST route to translate text using a JSON payload
app.post('/translate', (req, res) => {
    console.log(req.body);

  const { text, to } = req.body;

  if (!text || !to) {
    res.status(400).send({ error: 'Missing required parameters' });
    return;
  }

  translate(text, { to }).then(result => {
    res.send({ text: result.text });
  }).catch(err => {
    res.status(500).send({ error: err.message });
  });
});

// Add a global error handler to log any errors that occur while handling a request
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send({ error: err.message });
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
