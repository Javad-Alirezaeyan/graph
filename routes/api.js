var express = require('express');
var router = express.Router();
var homeController = require('../controllers/itemController');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('not found path');
});


router.get('/node', homeController.get);

module.exports = router;
