const AWS = require("aws-sdk");
const keys = require("../Keys");
const fs = require('fs');
const log_file = fs.createWriteStream(__dirname + '/add_user_debug.log', { flags: 'w' });
const log_stdout = process.stdout;

AWS.config.update(keys.awsConfig);

const docClient = new AWS.DynamoDB.DocumentClient();

module.exports = (req, res, next) => {
  const input = {
    user_name: req.body.userName
  };
  const params = {
    TableName: "Recipe_Users",
    Item: input
  };

  docClient.put(params, function (err, data) {
    if (err) {
      log_file.write(JSON.stringify(err, null, 2));
      log_stdout.write(JSON.stringify(err, null, 2));
      res.locals.error = err;
    } else {
      res.locals.addedUser = true;
    }
    return next();
  })
};