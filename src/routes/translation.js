const express = require('express');
const fs = require('fs');
const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const router = express.Router();

AWS.config.loadFromPath(__dirname + '/awsconfig.json');
const s3 = new AWS.S3();

require('dotenv').config();






/* 파파고 API */
function papago(querys , callback) {
    const client_id = process.env.CLIENT_ID;
    const client_secret = process.env.CLIENT_SECRET;

    /* 설정 */
    var api_url = 'https://openapi.naver.com/v1/papago/n2mt';
    var request = require('request');
    var options = {
        url : api_url,
        form : {'source':'en', 'target':'ko', 'text':querys},
        headers: {'X-Naver-Client-Id':client_id, 'X-Naver-Client-Secret': client_secret},
        json: true
    };

    /* API 요청 및 응답 */
    request.post(options, function(err, res, body) {
        if(!err && res.statusCode == 200) {
            // console.log(res.body.message.result.translatedText);
            callback(res.body.message.result.translatedText);
            return res.body.message.result.translatedText;
        }else {
            res.status(response.statusCode).end();
            console.log('[papago error] = ' + response.statusCode);
        }
    });


}

/* 이미지에서 텍스트 추출 */
function rekognition(photo_name, callback) {
    let query = '';

    /* 설정 */
    const config = new AWS.Config({
        accessKeyId : process.env.ACCESS_KEY_ID,
        secretAccessKey : process.env.SECRET_ACCESS_KEY
    });

    AWS.config.update({region : process.env.REGION});

    const client  = new AWS.Rekognition();
    const param = {
        Image : {
            S3Object : {
                Bucket : process.env.BUCKET,
                Name : photo_name
            }
        }
    }

    /* 텍스트 추출 */
    client.detectText(param, function(err, res) {
        if(err) {
            console.log(err, err.stack);
        }else {
            for(var i=0; i<Object.keys(res.TextDetections).length; i++) {
                if(res.TextDetections[i].Type == 'LINE') {
                    query += res.TextDetections[i].DetectedText;
                    query += ' ';
                }
            }
            //console.log(query);
            papago(query,function(params) {
                callback(params, query);
            });
        }
    });
}

/* 버킷에 이미지 업로드 */
const upload = multer({ 
    storage: multerS3({ 
        s3: s3, 
        bucket: process.env.BUCKET,
        acl: 'public-read', 
        key: function(req, file, cb) { 
            cb(null, Math.floor(Math.random() * 1000).toString() + Date.now() + '.' + file.originalname.split('.').pop()); 
        } 
    }), 
    limits: { 
        fileSize: 1000 * 1000 * 10 
    } 
});

/* 실행 */
router.post('/', upload.single('file'), function(req, res, next) {
    console.log("postpost")
    rekognition(req.file.key, function(params, query) {
        //console.log("final params : " + params);
        console.log("input txt : " + query);
        res.json({ok : 200, result : params, inputs : query})

    });
    console.log(req.file.key);
    let data = req.file.key;
    
});

module.exports = router;
