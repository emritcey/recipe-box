const AWS = require("aws-sdk");
const keys = require("../../Keys");

const fs = require('fs');
const log_file = fs.createWriteStream(__dirname + '/debug.log', { flags:'w' });
const log_stdout = process.stdout;

AWS.config.update(keys.awsConfig);
const docClient = new AWS.DynamoDB.DocumentClient();

module.exports = (req, res, next) => {
    const input = {
        recipe_id: req.params.id,
        recipe_name: req.body.recipe_name
    };

    const params = {
        TableName: "Recipe_List",
        Item: input
    };

    docClient.put(params, function (err, data) {
        if (err) {
            log_file.write(new Date().toString() + ": recipes::updateRecipe::error "+ JSON.stringify(err,null,2));
            log_stdout.write(new Date().toString() + ": recipes::updateRecipe::error " + JSON.stringify(err,null,2));
            res.locals.error = err;
            res.locals.success = false;
        } else {
            log_file.write(new Date().toString() + ": recipes::updateRecipe::success: " + req.params.id + "\r\n");
            log_stdout.write(new Date().toString() + ": recipes::updateRecipe::success: " + req.params.id + "\r\n");
            res.locals.success = true;
        }
        return next();
    })
};