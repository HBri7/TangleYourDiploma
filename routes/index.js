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
// console.log(key.exportKey('pkcs8-private'));

//PRIVATE KEY MATCH WITH PUBLIC
key.importKey('-----BEGIN PRIVATE KEY-----\
MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDWhpwj3nwrY+5y\
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
-----END PRIVATE KEY-----', 'pkcs8');

//WRONG KEY
// key.importKey('-----BEGIN PRIVATE KEY-----\
// MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCFZ7uc9pQoDdYu\
// p5fZNQb1ugQKEyqexaM3Bz0dXvEaR3UQyw+ciUUrXR/pnSl67JXN0HwK/DLh4IoT\
// CmohKWdZF28voRGOAw+iEc+bRczHfXOiSFDuAOGDLXoXme3CQ5qFlow1VaMzaZRG\
// EfTocNktsK3Uszs1OGBpdmMzmayy/QY3hT9tDSzvTkXXZIP3LLt7PunLWEVw1+38\
// iDqw8Eh2gxzBWFfq8UqdI8svkPlMlPhZo8xu3kmgwLsuFzDAU45j06qqRFLYVkkV\
// idy0J1Wlwkfhl1k+XcMrxt/cu9F5FYGT3pykRGk2mns/u2vlV5q7xwIbwzzugob4\
// zAjdz9ZpAgMBAAECggEBAIT85/aNiRx0zrMrtyB80Ddd/HDesnoco5xTxwTkhI2h\
// 9n2LMEDoRt/3sbx9Q8Ca4KuPzlhVGZQ69uoMU8hDMheKWPiuJIXhX1A9WSx85Ktp\
// 0EBSvvrEPgs65p9of7BNHFlXvuXcPRkfgwRnGjItbRMzMdb75WYkkVgRAMuLwrGa\
// QY7huy5zFmRbP5U0sbj/wk3tBt5vyTiMt+101hQ87EUEB/y+YOMlvRMhRPHlDDth\
// HdC1YynpFep0DcnzD8zJXDk9MeUJ+otFnRNzEDSReKV3VCGhtFXgvEci96RY1u20\
// /n5sGzNqs4DpJ9/NWfV5Nj3jZboMs1aAfh4I5tSKggECgYEAxrzvWuxL0GpdjYBA\
// wGCm8CKt81YSNhmxrbW1+5Ba1UrtnPQCh/O7SbNHmyNfzxpDG+N274M3/mS4IUOs\
// imnRee2j/gy5VfLXQq1dMDY0o4EKApQXKhkp7Bc+tfi56dM56Vd6rRU47Dy8zW8s\
// MNEiD7q654j3WKGzN+apOa32RjECgYEAq9fM4kLJtlUQ7hF//id/10xn8Plwua6N\
// 9nHPvZhJ1mi569KjrGFT8IvzAih1sq6nl5V2l81F1ouB9mIZK6jmk4jZIIOqfmt1\
// npBcjv7PtQwYrIbMAZlTTf9sGL8H9TIbbugKHlzRj+VUp9bXAoRPtCK5TPmDURRK\
// cJJN7K3orbkCgYA2a6I3iaExDw9TIh2ZEF5mP3jWu2j9O4f2A14z5tGYuo3afs76\
// n3lXsyoWh1dDBPP/fQgiihIZLUdmhHuI43UjKDnR5XYS3Q6pCYQNIarEYx90mUzG\
// kGF0buETP2rZZqfjB7tmDfuqZO9madz1+S6UlBN+N3lT4eOLmTQZwVNA4QKBgQCJ\
// RAI3Il56NQ0m/fedjvPBiRjmFnqC9/oSR+tHaWRhzpnk1AdF5SDl3wSoTqVlq7nX\
// jd6Dd8c3j4yqwMWWaH52jzPRkxsXjMMRfANTfhtwZU84URyYkl9GyKcSRVYX+ISN\
// XPDoPABxzyCGSUjKi+IW5D3cTNsmYuzraxKv4mMgkQKBgCMLWhruwkmP+KoDjtlu\
// WyP5gMx9Ta4I+K+H9NG7ZAQr5tio0KLUwhtI+KW+wDWrLG8thhopsOlhCkF+4K8S\
// iLmKV8rCu6RtuJFMgah4Q24EIsy/joF89rriXkdxU8Rrff1BVDJXmDHWl7YExzCY\
// 0C1cYM57zKP+M1easo0iU4Ec\
// -----END PRIVATE KEY-----', 'pkcs8');

key.importKey('-----BEGIN RSA PUBLIC KEY-----\
MIIBCgKCAQEA1oacI958K2PuclsTfFxkU44Zna7whOzZl/ELD20umx04bCkGSX/K\
a/X//VCB+MKSE+jzEnE2fmPxZEWgnYJAUvng1a3y0UQswzA0x5gFh8LLcc8tm5w6\
fycys43ng6wJxY3X998oBJby5CLFQk69XL2L9LgfvkEXOz23dsKKG+dywTX9kro+\
xsmuTD49UMMvNcPBmgSLLCxfoMR+H2OavzK05hbCVrjn0XO+DxJFuWGdG41BPUjG\
ZnQUVQDpetJod1foBKoQhXMCBIkpMw1oBziXh9f+TwRgkej2YZou86y1ZV+Rxdzg\
r+A8EUcFnCoK8RRWeF76F8X5+ss61/1t0QIDAQAB\
-----END RSA PUBLIC KEY-----', 'pkcs1-public-pem');

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
		fs.unlinkSync(req.file.path);
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
				res.json({result: result, reason: "Signature varification failed!"});
				res.end();
			}
			else {
				res.json({result: false, reason: "The hash does not match!"});
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

		fs.unlinkSync(req.file.path);
		
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
			res.send(JSON.stringify({iota_hash: bundle[0].hash}));
			res.end(200);
		})
	});
});

module.exports = router;
