var AWS = require('aws-sdk');

var express = require('express');
var app = express();
let query = '';
const bucket = 'MY AWS S3 BUCKET NAME'      // BUCKET NAME
const photo  = 'MY IMAGE NAME IN S3 BUCKET' // the name of file

const config = new AWS.Config({
  accessKeyId: 'MY AWS ACCESS KEY',
  secretAccessKey: 'MY AWS SECRET ACCESS KEY',
}) 
AWS.config.update({region:'MY REGION'});    // MY REGION
const client = new AWS.Rekognition();
const params = {
  Image: {
    S3Object: {
      Bucket: bucket,
      Name: photo
    },
  },
}
client.detectText(params, function(err, response) {
  if (err) {
    console.log(err, err.stack); // handle error if an error occurred
  } else {
    console.log(`Detected Text for: ${photo}`)
	//console.log(response)

	for(var i = 0; i < Object.keys(response.TextDetections).length; i++)
	{
		if(response.TextDetections[i].Type == 'LINE')
		{
			query += response.TextDetections[i].DetectedText;
			query += ' ';
		}

	}

	console.log(query);

	/*
    response.TextDetections.forEach(label => {
		console.log(`DetectedText${label.DetectedText}`)
      console.log(`Type: ${label.Type}`),
      console.log(`ID: ${label.Id}`),
      console.log(`Parent ID: ${label.ParentId}`),
      console.log(`Confidence: ${label.Confidence}`),
      console.log(`Polygon: `)
      console.log(label.Geometry.Polygon)
    }
	*/
  
  } 
});


var client_id = 'MY PAPAGO CLIENT ID';              // PAPAGO CLIENT ID
var client_secret = 'MY PAPAGO CLIENT SECRET KEY';  // PAPAGO SECRET KEY

app.get('/translate', function (req, res) {
   var api_url = 'https://openapi.naver.com/v1/papago/n2mt';
   var request = require('request');
   var options = {
       url: api_url,
       form: {'source':'en', 'target':'ko', 'text':query},
       headers: {'X-Naver-Client-Id':client_id, 'X-Naver-Client-Secret': client_secret}
    };
   request.post(options, function (error, response, body) {
     if (!error && response.statusCode == 200) {
	 	res.writeHead(200, {'Content-Type': 'text/json;charset=utf-8'});
       	res.end(body);
     } else {
       res.status(response.statusCode).end();
       console.log('error = ' + response.statusCode);
     }
   });
 });
 app.listen(3000, function () {
   console.log('http://127.0.0.1:3000/translate app listening on port 3000!');
 });
