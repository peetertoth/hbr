// **Import
const express = require('express');
const bodyParser = require('body-parser');
// **Import End

// Server instance
const app = express();

// Middleware for express server
app.use(bodyParser.json());

app.get('/', (req, res) => {
    console.log('Homepage open');
    res.send('<h1>Hello World!</h1>');
})

const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});