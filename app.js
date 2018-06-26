var request = require('request');
var express = require('express');
var app = express();

app.use(express.static('static'))

app.post('/boxes', function (req, res) {
    var url = "http://localhost:5000/model/predict";
    req.pipe(request(url)).pipe(res);
});

app.listen(8090);