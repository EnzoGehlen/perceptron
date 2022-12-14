import express from 'express';

const app = express();
app.set('view engine', 'pug');

app.get('/', (req, res) => {
  console.log('Hello World!');
  res.render('index', {
    title: 'Perceptron'
  });
});

app.listen(process.env.PORT || 3000, () => {
  console.log('Server is running on port', process.env.PORT || 3000);
});