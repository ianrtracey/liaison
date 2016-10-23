var watson =  require('watson-developer-cloud');
var Promise = require('bluebird');
require('dotenv').config()

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
  }
}
