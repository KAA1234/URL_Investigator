var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// Without middleware
router.get('/investigate', function (req, res) {
  const options = {
      root: path.join(__dirname)
  };
  const fileName = 'index.html';
  res.sendFile(fileName, options, function (err) {
      if (err) {
          console.error('Error sending file:', err);
          console.log('file path =', root);
      } else {
          console.log('Sent:', fileName);
          console.log('file path =', root);
      }
  });
});

module.exports = router;
