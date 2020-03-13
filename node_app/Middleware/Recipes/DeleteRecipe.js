const AWS = require("aws-sdk");
const keys = require("../../Keys");

const fs = require('fs');
const log_file = fs.createWriteStream(__dirname + '/debug.log', { flags:'w' });
const log_stdout = process.stdout;

AWS.config.update(keys.awsConfig);

const docClient = new AWS.DynamoDB.DocumentClient();

module.exports = (req,res,next) => {
    const params = {
        TableName: "Recipe_List",
        Key: {
            "recipe_id": req.params.id
        }
    };
    docClient.delete(params,function(err, data){
        if (err) {
            log_file.write(new Date().toString() + ": recipes::deleteRecipe::error "+ JSON.stringify(err,null,2));
            log_stdout.write(new Date().toString() + ": recipes::deleteRecipe::error " + JSON.stringify(err,null,2));
            res.status(401);
        } else {
            log_file.write(new Date().toString() + ": recipes::deleteRecipe::success: " + req.params.id + "\r\n");
            log_stdout.write(new Date().toString() + ": recipes::deleteRecipe::success: " + req.params.id + "\r\n");
        }
        return next();
    });
};