var watson =  require('watson-developer-cloud');
var Promise = require('bluebird');
require('dotenv').config()
var utils = require("./utils/solr_doc.js");

const cluster_id = 'sc8fc6b7fd_02d4_4206_bc3f_77e05b458a86';

module.exports = {

  service: new watson.RetrieveAndRankV1({
    username: process.env.RANK_RETRIEVAL_USERNAME,
    password: process.env.RANK_RETRIEVAL_PASSWORD
  }),

  listClusters: function(callback) {
    this.service.listClusters({},
      function(err, response) {
        if (err) {
          throw err;
        } else {
          callback(response);
        }
      });
  },

  createCluster: function(size, name, callback) {
    this.service.createCluster({
      cluster_size: size,
      cluster_name: name
    },
    function (err, response) {
      if (err) {
        throw err;
      } else {
        callback(response);
      }
    });
  },

  getCluster: function(callback) {
    this.listClusters(function(response) {
      if (response.clusters.length == 0) {
        this.createCluster('1', 'default', function(response) {
          callback(response);
        });
      } else {
        callback(response.clusters[0]);
      }
    });
  },

  createCollection: function(cluster_id, callback) {
      params = {
        cluster_id: cluster_id,
        config_name: 'example_config',
        collection_name: 'example_collection'
      }
      this.service.createCollection(params, function(err, response) {
        if (err) {
          throw err;
        } else {
          callback(response);
        }
      })
  },

  getSolrClient: function() {
    return this.service.createSolrClient({
      cluster_id: cluster_id,
      collection_name: 'example_collection'
    });
  },

  // used in conjunction with response from DocumentConversionService
  addDocument: function(response) {
    var solrClient = this.getSolrClient();
    console.log('Indexing a document...');
    var doc = utils.mapAnswerUnits2SolrDocs(response);
    solrClient.add(doc, function(err) {
      if (err) {
        console.log('Error indexing document: ' + err);
      } else {
        console.log('Indexed a document.');
        solrClient.commit(function(err) {
          if (err) {
            console.log('Error committing change: ' + err);
          } else {
            console.log('Successfully committed changes.');
          }
        });
      }
    });
  },

  search: function(key, query, callback) {
    console.log('Searching all documents.');
    var solrClient = this.getSolrClient();
    var query = solrClient.createQuery();
    // This query searches for the term 'psychological' in the content_text field.
    // For a wildcard query use:
    // query.q({ '*' : '*' });
    query.q({
        'content_text' : 'Winners'
    });

    solrClient.search(query, function(err, searchResponse) {
      if (err) {
        console.log('Error searching for documents: ' + err);
      } else {
        console.log('Found ' + searchResponse.response.numFound + ' document(s).');
        console.log('First document: ' + JSON.stringify(searchResponse.response.docs[0], null, 2));
      }
    }); }
}
