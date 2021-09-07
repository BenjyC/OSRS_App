var express = require('express');
var router = express.Router();
var osUtil = require('../osrsutil.js');

/* GET home page. */
router.get('/', function(req, res, next) {

  osUtil.getGEPrice().then(item => {
    req.app.locals.itemName = item.name;
    req.app.locals.itemPrice = item.current.price;
  });

  res.render('index', { 
    title: 'How Far From A Tbow Am I?',
  });
});

module.exports = router;
