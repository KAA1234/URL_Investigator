var express = require('express');
var router = express.Router();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const search_controller = require("../controllers/searchController");

/* GET home page! */
router.get('/', function(req, res, next) {
  res.render('URL_homepage', { title: 'Express' });
});

router.post("/submit-comment", search_controller.add_comment, search_controller.url_create_post);

//function(req, res, next) {
//  res.send("Comment " + req.body.comment + " submitted for url " + req.body.url);
//});

// investigate a url.
router.post("/", search_controller.url_create_post);




module.exports = router;
