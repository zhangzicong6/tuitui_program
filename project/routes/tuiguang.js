var express = require('express');
var router = express.Router();
var TuiGuangModel = require('../model/TuiGuang.js');
var TokenArr = require('../model/TokenArr.js');
var mem = require('../util/mem.js')

const asyncRedis = require("async-redis");
const redis_client = asyncRedis.createClient();

router.get('/token', async(req, res, next) => {
    var docs = await TokenArr.find();
    res.send({data: docs, success: '成功'})
})

router.get('/weitiao/:index',statics, function(req, res, next) {
    mem.get('weitiao_'+req.params.index).then(function(value){
        if(value){
            /*console.log('---------get weitiao value---------')
            console.log(value);
            console.log('------------------')*/
            var res_data = JSON.parse(value);
            res.render('tuiguang/weitiao',res_data);
        }else{
            var selector = {id: req.params.index}
            TuiGuangModel.find(selector, function(err, data){
                if (err) {
                    console.log("Error:" + err);
                }
                else {
                    if (data != '') {
                        var res_data={
                            pageTitle: data[0].pageTitle,
                            articleTit: data[0].articleTit,
                            name: data[0].name,
                            desc: data[0].desc,
                            picurl: data[0].picurl,
                            capter1: data[0].capter1,
                            linkUrl: data[0].linkUrl,
                            tokenCodes: data[0].tokenCodes,
                            statisticsUrl1: data[0].statisticsUrl1
                        }

                        mem.set('weitiao_'+req.params.index,JSON.stringify(res_data),60).then(function(){
                             //console.log('---------set weitiao value---------')
                        })
                        res.render('tuiguang/weitiao',res_data);
                    } else {
                        res.send('没有查询到此链接，请先创建')
                    }
                }
            })
        }
    }).catch(function(err){
        console.log(err);
    });
})

router.get('/singlepage/:index', statics, function(req, res, next) {
    mem.get('singlepage_'+req.params.index).then(function(value){
        if(value){
            /*console.log('---------get singlepage value---------')
            console.log(value);
            console.log('------------------')*/
            var res_data = JSON.parse(value);
            res.render('tuiguang/singlepage',res_data);
        }else{
            var selector = {id: req.params.index}
            TuiGuangModel.find(selector, function(err, data){
                if (err) {
                    console.log("Error:" + err);
                }
                else {
                    if (data != '') {
                        var res_data={
                            pageTitle: data[0].pageTitle,
                            articleTit: data[0].articleTit,
                            name: data[0].name,
                            desc: data[0].desc,
                            picurl: data[0].picurl,
                            capter1: data[0].capter1,
                            statisticsUrl1: data[0].statisticsUrl1
                        }
                        mem.set('singlepage_'+req.params.index,JSON.stringify(res_data),60).then(function(){
                             //console.log('---------set singlepage value---------')
                        })
                        res.render('tuiguang/singlepage',res_data);
                    } else {
                        res.send('没有查询到此链接，请先创建')
                    }
                }
            })
        }
    }).catch(function(err){
        console.log(err);
    });
})

router.get('/multipage/:index', statics, function(req, res, next) {
    mem.get('multipage_'+req.params.index).then(function(value){
        if(value){
            /*console.log('---------get multipage value---------')
            console.log(value);
            console.log('------------------')*/
            var res_data = JSON.parse(value);
            res.render('tuiguang/multipage',res_data);
        }else{
            var selector = {id: req.params.index}
            TuiGuangModel.find(selector, function(err, data){
                if (err) {
                    console.log("Error:" + err);
                }
                else {
                    if (data != '') {
                        var res_data={
                        	id: data[0].id,
                            pageTitle: data[0].pageTitle,
                            articleTit: data[0].articleTit,
                            name: data[0].name,
                            desc: data[0].desc,
                            picurl: data[0].picurl,
                            capter1: data[0].capter1,
                            tokenCodes: data[0].tokenCodes,
                            statisticsUrl1: data[0].statisticsUrl1,
                        }

                        mem.set('multipage_'+req.params.index,JSON.stringify(res_data),60).then(function(){
                             //console.log('---------set multipage value---------')
                        })
                        res.render('tuiguang/multipage',res_data);
                    } else {
                        res.send('没有查询到此链接，请先创建')
                    }
                }
            })
        }
    }).catch(function(err){
        console.log(err);
    });   
})

router.get('/capter/:index', statics, function(req, res, next) {
    mem.get('capter_'+req.params.index).then(function(value){
        if(value){
            /*console.log('---------get capter value---------')
            console.log(value);
            console.log('------------------')*/
            var res_data = JSON.parse(value);
            res.render('tuiguang/capter',res_data);
        }else{
            var selector = {id: req.params.index}
            TuiGuangModel.find(selector, function(err, data){
                if (err) {
                    console.log("Error:" + err);
                }
                else {
                    if (data != '') {
                        var res_data={
                            pageTitle: data[0].pageTitle,
                            articleTit: data[0].articleTit,
                            name: data[0].name,
                            desc: data[0].desc,
                            capter2: data[0].capter2,
                            statisticsUrl2: data[0].statisticsUrl2
                        }

                        mem.set('capter_'+req.params.index,JSON.stringify(res_data),60).then(function(){
                             //console.log('---------set capter value---------')
                        })
                        res.render('tuiguang/capter',res_data);
                    } else {
                        res.send('没有查询到此链接，请先创建')
                    }
                }
            })
        }
    }).catch(function(err){
        console.log(err);
    });
})



router.get('/copy',function(req, res, next){
    let index = req.query.index;
    let uid = req.query.uid;
    let channel = req.query.channel;
    redis_client.pfadd('website_tuiguang_copy_'+channel+'_'+index , uid)
    return res.send({
        message:'success'
    })
   
})

async function statics(req, res, next){
    if(req.url.indexOf('.')!=-1){
        await next()
        return
    }

    let query_channel =req.query.channel;
    let channel;
    if(query_channel){
        res.cookie(
            'website_tuiguang_c',query_channel,{
                path:'/',       // 写cookie所在的路径
                maxAge: 100*12*30*24*60*60*1000,   // cookie有效时长
                expires:new Date(Date.now()+100*12*30*24*60*60*1000), // cookie失效时间
                httpOnly:false,  // 是否只用于http请求中获取
                overwrite:false  // 是否允许重写
            }
        );
        channel = query_channel
    }else{
        channel = req.cookies['website_tuiguang_c'];
    }

    let uid = req.cookies['website_tuiguang_1'];
    if(!uid){
        uid = randomString(16)
        res.cookie(
            'website_tuiguang_1',uid,{
                path:'/',       // 写cookie所在的路径
                maxAge: 100*12*30*24*60*60*1000,   // cookie有效时长
                expires:new Date(Date.now()+100*12*30*24*60*60*1000), // cookie失效时间
                httpOnly:false,  // 是否只用于http请求中获取
                overwrite:false  // 是否允许重写
            }
        );
    }
    let index = req.params.index;

    //await redis_client.incr('h5novelsCBPv_'+ctx.channel+'_'+ctx.request.query.bid)
    await redis_client.pfadd('website_tuiguang_'+channel+'_'+index , uid)

    console.log(getClientIp(req))
    await redis_client.pfadd('website_tuiguang_ip_'+channel+'_'+index , getClientIp(req))

    await next()
}

let getClientIp = function (req) {
    return req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress || '';
}

function randomString(length) {
    var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
}

module.exports = router;