var express = require('express');
var router = express.Router();
var TuiGuangModel = require('../model/TuiGuang.js');
var mem = require('../util/mem.js')

router.get('/novel/:index', function(req, res, next) {
	console.log('----------------------test ceshi 测试---------------------------------')
    var selector = {id: req.params.index}
    mem.get('tuiguang_'+req.params.index).then(function(value){
        if(value){
            console.log('---------get tuiguang value---------')
            var res_data = JSON.parse(value);
            res.render('tuiguang/tuiguang',res_data);
        }else{
            TuiGuangModel.find(selector, function(err, data){
                if (err) {
                    console.log("Error:" + err);
                }
                else {
                    if (data != '') {
                        var res_data={
                            title: data[0].title,
                            headline: data[0].headline,
                            gonghao: data[0].gonghao,
                            author: data[0].author,
                            avator: data[0].avator,
                            content: data[0].content,
                            linkUrl: data[0].linkUrl,
                            statisticsUrl: data[0].statisticsUrl
                        }

                        mem.set('tuiguang_'+req.params.index,JSON.stringify(res_data),60*1000).then(function(){
                             console.log('---------set tuiguang value---------')
                        })
                        res.render('tuiguang/tuiguang',res_data);
                    } else {
                        res.send('没有查询到此链接，请先创建')
                    }
                }
            })
        }
    });
    
})

module.exports = router;