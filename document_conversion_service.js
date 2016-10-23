var DocumentConversionV1 = require('watson-developer-cloud/document-conversion/v1');
var fs = require('fs');
require('dotenv').config()

var document_conversion = new DocumentConversionV1({
  password:     process.env.DOC_CONVERSION_PASSWORD,
  username:     process.env.DOC_CONVERSION_USERNAME,
  version_date: '2015-12-01'
});

config = {
  word: {
    heading: {
      fonts: [
        { level: 1, min_size: 24 },
        { level: 2, min_size: 16, max_size: 24 }
      ]
    }
  }
};

document_conversion.convert({
  file: fs.createReadStream('harvard.html'),
  conversion_target: 'ANSWER_UNITS',
  // Use a custom configuration.
  config: config
}, function (err, response) {
  if (err) {
    console.error(err);
  } else {
    console.log(JSON.stringify(response, null, 2));
  }
});
