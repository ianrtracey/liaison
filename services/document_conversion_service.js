var DocumentConversionV1 = require('watson-developer-cloud/document-conversion/v1');
var fs = require('fs');
require('dotenv').config()


module.exports = {

  service :     new DocumentConversionV1({
    password:     process.env.DOC_CONVERSION_PASSWORD,
    username:     process.env.DOC_CONVERSION_USERNAME,
    version_date: '2015-12-01'
  }),

  config: {
    word: {
      heading: {
        fonts: [
          { level: 1, min_size: 24 },
          { level: 2, min_size: 16, max_size: 24 }
        ]
      }
    }
  },

  convertDocument: function(filepath, callback) {
    this.service.convert({
      file: fs.createReadStream(filepath),
      conversion_target: 'ANSWER_UNITS',
      // Use a custom configuration.
      config: this.config
      }, function (err, response) {
        if (err) {
          throw err;
        } else {
          callback(response);
        }
      })
  }
}

