var express = require('express');
var router = express.Router();
var multer  = require('multer');
var upload = multer({ dest: 'uploads/' });
var crypto = require('crypto');
var fs = require('fs');
var IOTA = require('iota.lib.js');
var NodeRSA = require('node-rsa');

function sha256(data) {
    return crypto.createHash("sha256").update(data).digest('hex');
}

const key = new NodeRSA({b: 2048});
//console.log(key.exportKey('pkcs8-public'));

key.importKey('-----BEGIN PRIVATE KEY-----\
MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDWhpwj3nwrY+5q\
WxN8XGRTjhmdrvCE7NmX8QsPbS6bHThsKQZJf8pr9f/9UIH4wpIT6PMScTZ+Y/Fk\
RaCdgkBS+eDVrfLRRCzDMDTHmAWHwstxzy2bnDp/JzKzjeeDrAnFjdf33ygElvLk\
IsVCTr1cvYv0uB++QRc7Pbd2woob53LBNf2Suj7Gya5MPj1Qwy81w8GaBIssLF+g\
xH4fY5q/MrTmFsJWuOfRc74PEkW5YZ0bjUE9SMZmdBRVAOl60mh3V+gEqhCFcwIE\
iSkzDWgHOJeH1/5PBGCR6PZhmi7zrLVlX5HF3OCv4DwRRwWcKgrxFFZ4XvoXxfn6\
yzrX/W3RAgMBAAECggEACwwtmE9J17YyvmLgUwQzCnaD7THoIwBLiF6acjXuM4DC\
uhc2wqw5EWw+vZ3aw6PJgAr8EZQQ+VtOQBqx1cqyY1OI95gYrBw1reuanDjA+CfY\
8Eh6Ecxu2sN7AfIp3QcMDcdrOtGcLvhTE9qSjAKgD9mXDog44kRZ3OwluZD1KdCe\
XfpySk/5XvcbhC27+MDdeAEK+DwUhXdJRYcvYC+oIEBOuHB+26fCMyLNf8FY2ddP\
fZyGJrtKoJECvUzC7q+3SuVPL8YT8SsLfnNKmuhzyEE3iYM1F6PtLXTr2oQEBWKo\
1nLN3xeids7gYD/JLpMXcYaVmkgEFkqmYuKO6hgQwQKBgQDsRRSmXjR9LogXs954\
UcyvsmCvA8m0NP0B2Mb6qnYj/Gexj2+u3R9ZdNStSerWDWWgtLwpsxyh2ljl/Z2G\
XLIjRWcVkQS3Ap0F91C9mgI2q7CgLJPaIxotih01smvouVeXrJTU3LKcn5dq8xVy\
6Ag2Yuci07ILHZn0d8FaacxDmQKBgQDocLDU/F8/XJmxC7nLVJysMyw71EXbUtQi\
7yvKWZ5TpgMlQ3Ib4hOwRoxbl/VAjbUKD5YFd7TzyQrs7vpj/nJX9b6aFmdmdoyC\
f9lMQYGe/FZMjwQ6aF4J9y1GTVd/PO+IlsL6DiR1fEWKkPH5/IzHsIkMcCOdHBkB\
1JViKdne+QKBgQDhDPgbdFY4+w6kzS7WmswGezl+23PQlDx++talw6Leqji3N/Jg\
tL18vz0phuQKWh54kk88xSA7xziwcgAPENKZqC0FrOm5zOJ24VlmEIGVQ7rtByka\
Oh9gS1OBZ19EAO8/SSNHEqWLbLSVKdA/cGcKLvENCmpoDh0scLma/nWT2QKBgQC7\
GzONT1YQuCbTuL+nqIWxrEO4KYjOIx+2u1ZBveBQL3uqvF8XiOYWaMPFW05F14xa\
++7kmdbkwvnzfe+7HHDI033Jpa04csdqqSWvV6/S3gdN+3YI2kiQtxMP22RKfS/I\
gKuVBFte41lLUKAofp6IhFfd1kskxiBvM8PIUC4caQKBgHR5OOH0wkYn4Y57EMm7\
GyXh/0/np4jGr7ejxP9VMq0lLRe3X21CFdZg5tlymB4lYHlu5hYpuTHbExLjx/ds\
GOoRZ/dvfmbgHlskRczvS1emYc+cEQmTN0NUNlNS5nMt0THtGdCU6Cg6MZWBfuz6\
POVeRKOVqwvL8lJ1PNG7yh0Z\
-----END PRIVATE KEY-----', 'pkcs8-private');

// key.importKey('-----BEGIN PUBLIC KEY-----\
// MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAg3LKRketeLPJNZrValW/\
// WukYH1+TKkjaVDFEQPBFiC54dMLdOmxxc5BRTAtenuzXnLQrq9ZTSKoeZWAf/0r9\
// 6ZWjOMKbljOmi90MkzZhVCJqy1WbKMyK51A3A0vjSxzKNC6+oAXuGPNxkhPYqtqI\
// L+axf2eff9g0YMotkuL5R+yVcXCZVRAC7d6FBYqNti/2cvfEyQrAA8G1QLEZVEN4\
// jpgqitWr8jatTBmW5CIoi/v4HCpk2ntngBVtbu72Owo9KZPM4Olz3F2tOvPRlzLo\
// 9b0X1IjZaHgu60wB4qkR+XNPt0e7aRtSm1UlBovLFIWCq0GDA88ywhx0WszKYFgF\
// dQIDAQAB\
// -----END PUBLIC KEY-----', 'pkcs8-public');

let seed    = 'PLWYXEQISUOXOJCDJ9JBCA9GMPMYBOEPDXRBWVQYXOEDUGSW9AGXTPODSZOJJSAR9GGUMMFXFNQUCWDPK';
 
let iota = new IOTA({
    'host': 'https://balancer.iotatoken.nl',
    'port': 4433
   
});

let stripTrytes = function(raw) {
	return raw.replace(/9+$/, "");
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

/* GET home page. */
router.get('/upload', function(req, res, next) {
  res.render('upload');
});

/* POST home page. */
router.post('/', upload.single('diploma'), function(req, res, next) {
	fs.readFile(req.file.path, 'utf8', (err, data) => {
		if (err) throw err;
		var hash = sha256(data);
		res.send(JSON.stringify({hash: hash, filename: req.file.originalname, size: req.file.size}))
		res.end(200);
	});
});

router.post('/checkTangle', function(req, res, next) {
	var hash = req.body.hash;
	var size = req.body.size;

	var tag = iota.utils.toTrytes(hash);
	tag = tag.substring(0,27);

	var referenceData = JSON.stringify({hash: hash, size: size, tag: tag});

	iota.api.findTransactionObjects({'tags':[tag]}, function(err, objects) {
		if(objects.length > 0) {
			var result = objects[0];
			var rawMessage = stripTrytes(result.signatureMessageFragment);
			var jsonMessage = iota.utils.fromTrytes(rawMessage);
			jsonMessage = JSON.parse(jsonMessage);
			
			var signature = jsonMessage.signature;
			delete jsonMessage.signature;
			
			jsonMessage = JSON.stringify(jsonMessage);
			console.log(jsonMessage);

			if(jsonMessage == referenceData) {
				console.log("Succes!");
				var result = key.verify(referenceData, signature, 'utf8', 'base64');
				console.log(result);
				res.json({result: result});
				res.end();
			}
			else {
				res.json({result: false, reason: "The signature does not match!"});
				res.end();
			}
		}
		else {
			res.json({result: false, reason: "Diploma not found in Tangle!"});
			res.end();
		}
		
	});
});

/* POST home page. */
router.post('/uploadTangle', upload.single('diploma'), function(req, res, next) {
	fs.readFile(req.file.path, 'utf8', (err, data) => {
		if (err) throw err;
		
		var hash = sha256(data);
		
		var tag = iota.utils.toTrytes(hash);
		tag = tag.substring(0,27);
		
		var dataToTangle = JSON.stringify({hash: hash, size: req.file.size, tag: tag});

		var signature = key.sign(dataToTangle, 'base64');
		console.log('signature: ', signature);
		
		console.log('verification:', key.verify(dataToTangle, signature, 'utf8', 'base64'));
		
		var dataToTangle = JSON.stringify({hash: hash, size: req.file.size, tag: tag, signature: signature});
		dataToTangleTrytes = iota.utils.toTrytes(dataToTangle);
		
		var transfer = [
		{
			'address': 'DIPLOMADIPLOMADIPLOMADIPLOMADIPLOMADIPLOMADIPLOMADIPLOMADIPLOMADIPLOMADIPLOMADIPLVFKE9HVXB',
			'value': 0,
			'tag': tag,
			'obsoleteTag': tag,
			'message': dataToTangleTrytes
		}
		]
		
		iota.api.sendTransfer(seed, 4, 14, transfer, function(e, bundle) {
			if (e) throw e;
			console.log("Successfully sent your transfer: ", bundle);
		})
		
		res.send(JSON.stringify({hash: hash, size: req.file.size, tag: tag}))
		
		res.end(200);
	});
});

module.exports = router;
