var express = require('express');
var router = express.Router();
var osUtil = require('../osrsutil.js');

router.get('/', function(req, res, next) {
  res.redirect("/");
});

router.post('/', function(req, res, next) {

  if (req.body.amount) {

    bankVal = req.body.amount;
    req.app.locals.afford = osUtil.getPriceDiff(bankVal, req.app.locals.itemPrice)[0];
    req.app.locals.priceDiff = osUtil.getPriceDiff(bankVal, req.app.locals.itemPrice)[1];

    res.render('results', { 
      title: 'Results',
      amount: req.body.amount,
      itemName: req.app.locals.itemName,
      itemPrice: req.app.locals.itemPrice,
      priceDiff: req.app.locals.priceDiff
    });
  }
});

module.exports = router;
