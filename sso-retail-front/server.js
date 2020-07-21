const express = require('express');

const app = express();

app.use(express.static('./dist/retail'));

app.get('/*', function(req, res) {
    res.sendFile('index.html', {root: 'dist/retail/'});
});

app.listen(process.env.PORT || 8080);