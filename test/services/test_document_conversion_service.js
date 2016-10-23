var assert = require('assert');
var DocumentConversionService = require('../../services/document_conversion_service.js');
var sleep = require('sleep');


describe('DocumentConversionService', function() {

  it('should allow for document to be converted', function() {
    var result;
    DocumentConversionService.convertDocument('./test/harvard.html', function() {
      result = response;
    });
    setTimeout(function() {
      assert.notEqual(result, null);
    }, 2000);
  });


});
