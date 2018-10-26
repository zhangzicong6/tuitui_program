const express = require('express');
const router = express.Router();
const AlipayLink = require('../model/AlipayLink')
const mem = require('../util/mem.js');

router.get('/', async(req, res, next) => {
    let alipay_string = await mem.get('alipay_string_link')
    let data;
    if(alipay_string){
        data = JSON.parse(alipay_string)
    }else{
        data =  await AlipayLink.find();
        await mem.set('alipay_string_link',JSON.stringify(data),30)
    }
    res.send({data: data})
})


module.exports = router;