const express = require('express')
const path = require('path');
const index = require('./index.js');
const app = express()
const port = 3000

app.get('/', (req, res) => res.sendFile(path.join(__dirname + '/index.html')))
app.get('/api', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(index.states_data));
})
app.use(express.static(__dirname + '/'));
app.listen(port, () => console.log(`App listening on port ${port}!`))