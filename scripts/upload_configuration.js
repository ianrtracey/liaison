var watson = require('watson-developer-cloud');
var retrieve_and_rank = watson.retrieve_and_rank({
  username: process.env.DOC_CONVERSION_USERNAME,
  password: process.env.DOC_CONVERSION_PASSWORD
  version: 'v1'
});

var params = {
  cluster_id: 'sc8fc6b7fd_02d4_4206_bc3f_77e05b458a86',
  config_name: 'example_config',
  config_zip_path: '/Users/iantracey/Downloads/answer_unit_config.zip'
};

retrieve_and_rank.uploadConfig(params,
  function (err, response) {
    if (err)
      console.log('error:', err);
    else
      console.log(JSON.stringify(response, null, 2));
});
