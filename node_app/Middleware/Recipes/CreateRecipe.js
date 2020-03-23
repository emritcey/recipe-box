const AWS = require("aws-sdk");
const keys = require("../../Keys");

const fs = require('fs');
const log_file = fs.createWriteStream(__dirname + '/debug.log', { flags:'w' });
const log_stdout = process.stdout;

AWS.config.update(keys.awsConfig);

const docClient = new AWS.DynamoDB.DocumentClient();

module.exports = (req, res, next) => {
    const input = {
        "recipe_id": req.body.recipe_id
        // "title": req.body.title,
        // "description": req.body.description,
        // "instructions": req.body.instructions,
        // "created_by": req.body.user_name,
        // "created_on": new Date().toString(),
        // "updated_by": req.body.user_name,
        // "updated_on": new Date().toString(),
        // "is_deleted": false
    };
    const params = {
        TableName:"Recipe_List",
        Item: input
    };
    docClient.put(params, function(err, data){
        if (err) {
            log_file.write(new Date().toString() + ": recipes::createRecipe::error "+ JSON.stringify(err,null,2));
            log_stdout.write(new Date().toString() + ": recipes::createRecipe::error " + JSON.stringify(err,null,2));
            res.status(401);
        } else {
            log_file.write(new Date().toString() + ": recipes::createRecipe::success: " + req.body.recipe_id + "\r\n");
            log_stdout.write(new Date().toString() + ": recipes::createRecipe::success: " + req.body.recipe_id + "\r\n");
        }
        return next();
    })
};

