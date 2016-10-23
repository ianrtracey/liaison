
  var convertAnswerUnit2SolrDoc = function(au) {
  var solrDoc;
  var auContents = au.content;
  auContents.forEach(function(auContent) {
    if (auContent.media_type === 'text/plain') {
      solrDoc = {
        id: au.id,
        title: au.title,
        type: au.type,
        media_type: auContent.media_type,
        content_text: auContent.text
      };
    }
  });
  return solrDoc;
  };

  var mapAnswerUnits2SolrDocs = function(data) {
  var answerUnits = data.answer_units;
  var solrDocList = [];
  answerUnits.forEach(function(value) {
    var solrDoc = convertAnswerUnit2SolrDoc(value);
    solrDocList.push(solrDoc);
  });
  return solrDocList;
  };

module.exports = {
   convertAnswerUnit2SolrDoc: convertAnswerUnit2SolrDoc,
   mapAnswerUnits2SolrDocs: mapAnswerUnits2SolrDocs
}
