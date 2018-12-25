var express = require('express');
var router = express.Router();
var RecommendNovelModel = require('../model/RecommendNovel.js');
var RecommendListModel = require('../model/RecommendList.js');
var DomainModel = require('../model/Domain.js');
var mem = require('../util/mem.js')

router.get('/novel/:id', async(req, res, next) => {
	let id = req.params.id;
	let docs = await RecommendNovelModel.findById(id)
	if(docs) {
		res.render('recommend/novel', docs);
	}else {
		res.send('没有查询到此链接！！！')
	}
});

router.get('/back/novel/:id',async(req,res,next) => {
	let id = req.params.id;
	let length = await RecommendNovelModel.count({id:id})
	let skip = parseInt(Math.random()*(length-1))
	let recommends = await RecommendNovelModel.find({id: id},{id:1}).skip(skip).limit(1)
	if(recommends.length){
    res.send({id: recommends[0]._id})
	}else{
    res.send({id: id})
	}
});

router.get('/list/:id', async(req, res, next) => {
	let id = req.params.id;
  let docs = await RecommendNovelModel.find({id: id})
  let domain_names = await DomainModel.find();
	if(docs) {
		res.render('recommend/list', {listArray: JSON.stringify(docs), domain_name: JSON.stringify(domain_names[0].domain_name)});
	}else {
		res.send('没有查询到此链接！！！')
	}
});

router.get('/get_list', async(req, res, next) => {
	let id = req.query.id;
  let docs = await RecommendNovelModel.find({id: id});
  let domain_names = await DomainModel.find();
	if(docs) {
		res.send({data: docs, domain_name: domain_names[0].domain_name})
	}
})

module.exports = router;