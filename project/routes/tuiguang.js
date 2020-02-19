var express = require('express');
var router = express.Router();
var TuiGuangModel = require('../model/TuiGuang.js');
var PlatformDataModel = require('../model/PlatformData.js');
var TokenArr = require('../model/TokenArr.js');
var mem = require('../util/mem.js')
var url = require('url');

function fullUrl(req) {
  return url.format({
    protocol: req.protocol,
    host: req.get('host'),
    pathname: req.originalUrl
  });
}


function handleIpAndUa(ip, ua) {
    let uni_ip_h_ua =  (ip + ua.substring(0,ua.indexOf(')',ua.indexOf(')')+1)+1));
    if(uni_ip_h_ua.indexOf('iPhone')!=-1){
        let replace_start = uni_ip_h_ua.substring(0,uni_ip_h_ua.indexOf('(')+1);
        let replace_end =  uni_ip_h_ua.substring(uni_ip_h_ua.indexOf(')'))
        uni_ip_h_ua = replace_start+ 'iPhone' + replace_end
    }
    return uni_ip_h_ua;
}

//const asyncRedis = require("async-redis");
//const redis_client = asyncRedis.createClient();

router.get('/token', async (req, res, next) => {
  var docs = await TokenArr.find();
  res.send({data: docs, success: '成功'})
})



router.get('/data/:index', async (req, res, next) => {
  let value = await mem.get('data_' + req.params.index);
  
  let ip = req.clientIp;
  let ua = req.headers['user-agent'];
  //let h_ua = ua.substring(0,ua.indexOf(')',ua.indexOf(')')+1)+1);

  let toutiao_data = {
    uni_ip_h_ua : handleIpAndUa(ip,ua),
    td_ua : ua,
    tuiguang_id : req.params.index,
    ip : ip,
    td_clickid : req.query.clickid,
    td_url : encodeURIComponent('https://td.tyuss.com'+req.originalUrl)
  }
  await PlatformDataModel.findOneAndUpdate({uni_ip_h_ua:toutiao_data.uni_ip_h_ua},toutiao_data,{upsert: true})

  if (value) {
    let res_data = JSON.parse(value);
    if(res_data.suffix){
        let sufs = res_data.suffix.split(',')
        res_data.gonghao_id += sufs[parseInt(Math.random()*sufs.length)]
    }
    res.render('tuiguang/data', res_data);
  } else {
    let data = await TuiGuangModel.find({id: req.params.index});
    if (data.length > 0) {
      let res_data = {
        pageTitle: data[0].pageTitle,
        name: data[0].name,
        gonghao_id: data[0].gonghao_id,
        desc: data[0].desc,
        picurl: data[0].picurl,
        finalImg: data[0].finalImg,
        gonghaoLogo: data[0].gonghaoLogo,
        capter1: data[0].capter1,
        tokenCodes: data[0].tokenCodes,
        statisticsUrl1: data[0].statisticsUrl1,
        company: data[0].company,
        suffix : data[0].suffix,
        jumpUrl : data[0].jumpUrl,
        isJump: data[0].isJump,
        bgcolor: data[0].bgcolor,
        isClick: data[0].isClick,
      };

      await  mem.set('toutiao_' + req.params.index, JSON.stringify(res_data), 60)
      if(res_data.suffix){
        let sufs = res_data.suffix.split(',')
        res_data.gonghao_id += sufs[parseInt(Math.random()*sufs.length)]
      }
      res.render('tuiguang/data', res_data);
    }
  }
});


router.get('/toutiao/:index', async (req, res, next) => {
  let value = await mem.get('toutiao_' + req.params.index);
  
  //console.log(req.query)
  
  if (value) {
    let res_data = JSON.parse(value);
    if(res_data.suffix){
        let sufs = res_data.suffix.split(',')
        res_data.gonghao_id += sufs[parseInt(Math.random()*sufs.length)]
    }
    res.render('tuiguang/toutiao', res_data);
  } else {
    let data = await TuiGuangModel.find({id: req.params.index});
    if (data.length > 0) {
      let res_data = {
        pageTitle: data[0].pageTitle,
        name: data[0].name,
        gonghao_id: data[0].gonghao_id,
        desc: data[0].desc,
        picurl: data[0].picurl,
        finalImg: data[0].finalImg,
        gonghaoLogo: data[0].gonghaoLogo,
        capter1: data[0].capter1,
        tokenCodes: data[0].tokenCodes,
        statisticsUrl1: data[0].statisticsUrl1,
        company: data[0].company,
        suffix : data[0].suffix,
        jumpUrl : data[0].jumpUrl,
        isJump: data[0].isJump,
        bgcolor: data[0].bgcolor,
        isClick: data[0].isClick,
      };

      if(req.hostname=='mingxing.dfcfz.cn'){
        res_data.picurl = 'http://novel.jtjsmp.top/'+res_data.picurl;
        res_data.finalImg = 'http://novel.jtjsmp.top/'+res_data.finalImg;
        res_data.gonghaoLogo = 'http://novel.jtjsmp.top/'+res_data.gonghaoLogo;
      }

      await  mem.set('toutiao_' + req.params.index, JSON.stringify(res_data), 60)
      if(res_data.suffix){
        let sufs = res_data.suffix.split(',')
        res_data.gonghao_id += sufs[parseInt(Math.random()*sufs.length)]
      }
      res.render('tuiguang/toutiao', res_data);
    }
  }
});

router.get('/weitiao/:index', function (req, res, next) {
  mem.get('weitiao_' + req.params.index).then(function (value) {
    if (value) {
      /*console.log('---------get weitiao value---------')
      console.log(value);
      console.log('------------------')*/
      var res_data = JSON.parse(value);
      res.render('tuiguang/weitiao', res_data);
    } else {
      var selector = {id: req.params.index}
      TuiGuangModel.find(selector, function (err, data) {
        if (err) {
          console.log("Error:" + err);
        } else {
          if (data != '') {
            var res_data = {
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

            mem.set('weitiao_' + req.params.index, JSON.stringify(res_data), 60).then(function () {
              //console.log('---------set weitiao value---------')
            })
            res.render('tuiguang/weitiao', res_data);
          } else {
            res.send('没有查询到此链接，请先创建')
          }
        }
      })
    }
  }).catch(function (err) {
    console.log(err);
  });
})

router.get('/singlepage/:index', function (req, res, next) {
  mem.get('singlepage_' + req.params.index).then(function (value) {
    if (value) {
      /*console.log('---------get singlepage value---------')
      console.log(value);
      console.log('------------------')*/
      var res_data = JSON.parse(value);
      res.render('tuiguang/singlepage', res_data);
    } else {
      var selector = {id: req.params.index}
      TuiGuangModel.find(selector, function (err, data) {
        if (err) {
          console.log("Error:" + err);
        } else {
          if (data != '') {
            var res_data = {
              pageTitle: data[0].pageTitle,
              articleTit: data[0].articleTit,
              name: data[0].name,
              desc: data[0].desc,
              picurl: data[0].picurl,
              capter1: data[0].capter1,
              statisticsUrl1: data[0].statisticsUrl1,
              tokenCodes: data[0].tokenCodes
            }
            mem.set('singlepage_' + req.params.index, JSON.stringify(res_data), 60).then(function () {
              //console.log('---------set singlepage value---------')
            })
            res.render('tuiguang/singlepage', res_data);
          } else {
            res.send('没有查询到此链接，请先创建')
          }
        }
      })
    }
  }).catch(function (err) {
    console.log(err);
  });
})

router.get('/multipage/:index', function (req, res, next) {
  mem.get('multipage_' + req.params.index).then(function (value) {
    if (value) {
      /*console.log('---------get multipage value---------')
      console.log(value);
      console.log('------------------')*/
      var res_data = JSON.parse(value);
      res.render('tuiguang/multipage', res_data);
    } else {
      var selector = {id: req.params.index}
      TuiGuangModel.find(selector, function (err, data) {
        if (err) {
          console.log("Error:" + err);
        } else {
          if (data != '') {
            var res_data = {
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

            mem.set('multipage_' + req.params.index, JSON.stringify(res_data), 60).then(function () {
              //console.log('---------set multipage value---------')
            })
            res.render('tuiguang/multipage', res_data);
          } else {
            res.send('没有查询到此链接，请先创建')
          }
        }
      })
    }
  }).catch(function (err) {
    console.log(err);
  });
})

router.get('/capter/:index', function (req, res, next) {
  mem.get('capter_' + req.params.index).then(function (value) {
    if (value) {
      /*console.log('---------get capter value---------')
      console.log(value);
      console.log('------------------')*/
      var res_data = JSON.parse(value);
      res.render('tuiguang/capter', res_data);
    } else {
      var selector = {id: req.params.index}
      TuiGuangModel.find(selector, function (err, data) {
        if (err) {
          console.log("Error:" + err);
        } else {
          if (data != '') {
            var res_data = {
              pageTitle: data[0].pageTitle,
              articleTit: data[0].articleTit,
              name: data[0].name,
              desc: data[0].desc,
              capter2: data[0].capter2,
              statisticsUrl2: data[0].statisticsUrl2
            }

            mem.set('capter_' + req.params.index, JSON.stringify(res_data), 60).then(function () {
              //console.log('---------set capter value---------')
            })
            res.render('tuiguang/capter', res_data);
          } else {
            res.send('没有查询到此链接，请先创建')
          }
        }
      })
    }
  }).catch(function (err) {
    console.log(err);
  });
})


router.get('/copy', function (req, res, next) {
  let index = req.query.index;
  let uid = req.query.uid;
  let channel = req.query.channel;
  let type = req.query.type || 'copy';
  //console.log('type----------',type)
  //redis_client.pfadd('website_tuiguang_' + type + '_' + channel + '_' + index, uid)
  return res.send({
    message: 'success'
  })

})

async function statics(req, res, next) {
  if (req.url.indexOf('.') != -1) {
    await next()
    return
  }

  let query_channel = req.query.channel;
  let channel;
  if (query_channel) {
    res.cookie(
      'website_tuiguang_c', query_channel, {
        path: '/',       // 写cookie所在的路径
        maxAge: 100 * 12 * 30 * 24 * 60 * 60 * 1000,   // cookie有效时长
        expires: new Date(Date.now() + 100 * 12 * 30 * 24 * 60 * 60 * 1000), // cookie失效时间
        httpOnly: false,  // 是否只用于http请求中获取
        overwrite: false  // 是否允许重写
      }
    );
    channel = query_channel
  } else {
    channel = req.cookies['website_tuiguang_c'];
  }

  let uid = req.cookies['website_tuiguang_1'];
  if (!uid) {
    uid = randomString(16)
    res.cookie(
      'website_tuiguang_1', uid, {
        path: '/',       // 写cookie所在的路径
        maxAge: 100 * 12 * 30 * 24 * 60 * 60 * 1000,   // cookie有效时长
        expires: new Date(Date.now() + 100 * 12 * 30 * 24 * 60 * 60 * 1000), // cookie失效时间
        httpOnly: false,  // 是否只用于http请求中获取
        overwrite: false  // 是否允许重写
      }
    );
  }
  let index = req.params.index;

  //await redis_client.incr('h5novelsCBPv_'+ctx.channel+'_'+ctx.request.query.bid)
  //await redis_client.pfadd('website_tuiguang_' + channel + '_' + index, uid)

  //console.log(getClientIp(req))
  //await redis_client.pfadd('website_tuiguang_ip_' + channel + '_' + index, getClientIp(req))

  await next()
}

let getClientIp = function (req) {
    console.log('-----ip-----')
    console.log(req.headers["x-real-ip"]);
    console.log(req.headers['x-forwarded-for']);
    console.log(req.headers['x-client-ip']);
    //console.log(req.connection?req.connection.remoteAddress:'');
    //console.log(req.socket.remoteAddress);
    //console.log(req.connection?req.connection.socket.remoteAddress:'');
  return 
    req.headers['x-forwarded-for'] ||
    req.headers["x-real-ip"]  ||
    req.headers['x-client-ip'] ||
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