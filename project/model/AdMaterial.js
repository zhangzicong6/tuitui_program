var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var connect_url = require('../conf/proj.json').mongodb;
var db = mongoose.createConnection(connect_url);

var AdMaterialSchema = new Schema({
    id:Number,
    title: String,
    novelLink: String,
    imgList: [{
        url: String,
        sign: String,
        weight: String
    }]
});

var AdMaterialModel = db.model('AdMaterial', AdMaterialSchema);
module.exports = AdMaterialModel;