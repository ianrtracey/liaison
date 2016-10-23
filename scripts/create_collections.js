var watson = require('watson-developer-cloud');
var retrieve_and_rank = watson.retrieve_and_rank({
  username: process.env.RANK_RETRIEVAL_USERNAME,
  password: process.env.RANK_RETRIEVAL_PASSWORD
  version: 'v1'
});

var params = {
  cluster_id: 'sc8fc6b7fd_02d4_4206_bc3f_77e05b458a86',
  config_name: 'example_config',
  collection_name: 'example_collection',
  wt: 'json'
};

retrieve_and_rank.createCollection(params,
  function (err, response) {
    if (err)
      console.log('error:', err);
    else
      console.log(JSON.stringify(response, null, 2));
});
