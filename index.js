var http = require('https');
var fs = require('fs');
const uuidv1 = require('uuid/v1');
var fileName = uuidv1();
let pdfUrl = process.env.PDFURL || process.argv[2];
let ocrURL = process.env.OCRURL || process.argv[3];
let ocrKey = process.env.OCRKEY || process.argv[4];
let PDF2Pic = require('pdf2pic').default
let converter = new PDF2Pic({
  density: 300, // output pixels per inch
  savename: fileName, // output file name
  savedir: "./images", // output file location
  format: "png" // output file format
});

var localFile = fileName + ".pdf";
var pngFile = "images/" + fileName + "_1.png";

var file = fs.createWriteStream(localFile);
var request = http.get(pdfUrl, function (response) {
  response.pipe(file);

  file.on('finish', function () {
    file.close();
    converter.convertBulk(localFile, -1)
      .then(resolve => {

        var request = require("request");
        var options = {
          method: 'POST',
          body: fs.createReadStream(pngFile),
          url: ocrURL,
          headers: {
            'Ocp-Apim-Subscription-Key': ocrKey,
            'Content-Type': 'application/octet-stream'
          }
        };

        request(options, function (error, response, body) {
          if (error) throw new Error(error);
          process.stdout.write(body);
        });
      })
  });
}).on('error', function (err) { // Handle errors
  fs.unlink(file); // Delete the file async. (But we don't check the result)
  if (cb) cb(err.message);
});