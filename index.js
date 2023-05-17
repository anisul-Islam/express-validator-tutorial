const express = require('express');

const userRoutes = require('./routes/user');

const app = express();

const port = 3009;

app.listen(port, () => {
  console.log(`server is running at http://localhost:${port}`);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', userRoutes);

app.get('/test', (req, res) => {
  res.send('testing the server');
});
