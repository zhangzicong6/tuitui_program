var express = require('express');
var router = express.Router();
var AdMaterialModel = require('../model/AdMaterial.js');
var mem = require('../util/mem.js')
const asyncRedis = require("async-redis");
const redis_client = asyncRedis.createClient();

router.get('/img/:id',function(req, res, next){
    var id = req.params.id;
    mem.get('AdMaterial_' + id).then(function (value) {
        if(value){
            value = JSON.parse(value)
            var img = value.imgList[Math.floor(Math.random() * value.imgList.length)]
            //console.log('----li----', link)
            //res.send(getLink(img,value))
            res.redirect(img.url)
        }else {
            AdMaterialModel.find({id: id}, function (err, data) {
                if (data && data[0]) {
                    var img = data[0].imgList[Math.floor(Math.random() * data[0].imgList.length)]
                    mem.set('AdMaterial_' + req.params.id, JSON.stringify(data[0]), 1*60).then(function () {
                        //console.log('---------set transfer value---------')
                    })
                    //console.log('----lixin----', link)
                    //res.send(getLink(img,data[0]))
                    res.redirect(img.url)
                }else{
                    res.send('没有查询到此链接，请先创建')
                }
            })

        }
    }).catch(function (err) {
        console.log(err);
    });
})

router.get('/link/:id',function(req, res, next){
    var id = req.params.id;
    mem.get('AdMaterial_' + id).then(function (value) {
        if(value){
            value = JSON.parse(value)
            res.redirect(value.novelLink)
        }else {
            AdMaterialModel.find({id: id}, function (err, data) {
                if (data && data[0]) {
                    mem.set('AdMaterial_' + req.params.id, JSON.stringify(data[0]), 1*60).then(function () {
                        //console.log('---------set transfer value---------')
                    })
                    //console.log('----lixin----', link)
                    //res.send(getLink(img,data[0]))
                    res.redirect(value.novelLink)
                }else{
                    res.send('没有查询到此链接，请先创建')
                }
            })

        }
    }).catch(function (err) {
        console.log(err);
    });
})

router.get('/:id', function (req, res, next) {
    var id = req.params.id;
    mem.get('AdMaterial_' + id).then(function (value) {
        if(value){
            value = JSON.parse(value)
            var img = value.imgList[Math.floor(Math.random() * value.imgList.length)]
            //console.log('----li----', link)
            res.send(getLink(img,value))
        }else {
            AdMaterialModel.find({id: id}, function (err, data) {
                if (data && data[0]) {
                    var img = data[0].imgList[Math.floor(Math.random() * data[0].imgList.length)]
                    mem.set('AdMaterial_' + req.params.id, JSON.stringify(data[0]), 1*60).then(function () {
                        //console.log('---------set transfer value---------')
                    })
                    //console.log('----lixin----', link)
                    res.send(getLink(img,data[0]))
                }else{
                    res.send('没有查询到此链接，请先创建')
                }
            })

        }
    }).catch(function (err) {
        console.log(err);
    });
})


function getLink(img,value){
    var obj={
        imgUrl : img.url,
    }
    var link = '';
    if(value.novelLink.indexOf('?')!=-1){
            link = value.novelLink+'&material='+img.sign
    }else{
            link=value.novelLink+'?material='+img.sign
    }
    obj.link = link;
    statics(img,value)
    return obj;
}

function statics(img,value){
    redis_client.incr('website_AdMaterial_show_'+value.id+'_'+img.sign).then(function(){})
}

module.exports = router;
