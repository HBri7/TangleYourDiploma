var express = require('express');
var router = express.Router();
var multer  = require('multer');
var upload = multer({ dest: 'uploads/' });
var crypto = require('crypto');
var fs = require('fs');
var iota = require('iota.lib.js');

function sha256(data) {
    return crypto.createHash("sha256").update(data).digest('hex');
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* POST home page. */
router.post('/', upload.single('diploma'), function(req, res, next) {
	console.log(req.file);
	fs.readFile(req.file.path, 'utf8', (err, data) => {
		if (err) throw err;
		var hash = sha256(data);
		res.send(JSON.stringify({hash: hash, filename: req.file.originalname, size: req.file.size}))
		res.end(200);
	});
});

module.exports = router;
