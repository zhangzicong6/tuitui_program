var express = require('express');
var router = express.Router();
var TransferModel = require('../model/Transfer.js');

router.post('/', function(req, res, next) {
    var url = req.body.url;
    TransferModel.find({id:url}, function (err, data) {
        var link = url;
        if (data[0]) {
            link = data[0].links[Math.floor(Math.random() * data[0].links.length)]
        }
        res.send(link)
    })
})

module.exports = router;
