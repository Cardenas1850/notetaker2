const express = require('express');
const path = require('path');

const api = require('./routes/notes');

const noteRoutes = require('./routes/noteroute');

const PORT = process.env.PORT || 80;

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
app.use('/', noteRoutes);
app.use('/api', api);

app.listen(PORT, () => {
    console.log(`Listening on port http://localhost:${PORT}`);
});