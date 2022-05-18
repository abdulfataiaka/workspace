const cors = require('cors');
const express = require('express');

const getRandomStock = () => Math.round(Math.random() * (2 - 0) + 0);

const getRandomPrice = () => Math.random() * (5000 - 20) + 20;

const STOCKS = [
  { id: 1, ticker: 'AAPL', price: 497.48 },
  { id: 2, ticker: 'MSFT', price: 213.02 },
  { id: 3, ticker: 'AMZN', price: 3284.72 },
];

const PORT = process.env.PORT;

const app = express();

app.use(cors());

app.get('/stocks', function (req, res) {
  res.status(200).json({ success: true, data: STOCKS });
});

app.get('/updates', function (req, res) {
  res.writeHead(200, {
    Connection: 'keep-alive',
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
  });

  setInterval(async () => {
    console.log('Sending data to stream');

    const stock = STOCKS[getRandomStock()];

    res.write('event: message\n');
    res.write('data:' + JSON.stringify({ ...stock, price: getRandomPrice() }));
    res.write('\n\n');
  }, 3000);
});

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
