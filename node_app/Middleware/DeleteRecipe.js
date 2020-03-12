const AWS = require("aws-sdk");
const keys = require("../Keys");

const fs = require('fs');
const log_file = fs.createWriteStream(__dirname + '/delete_recipe_debug.log', {flags:'w'});
const log_stdout = process.stdout;

AWS.config.update(keys.awsConfig);

const docClient = new AWS.DynamoDB.DocumentClient();

module.exports = (req,res,next) => {
    const params = {
        TableName: "Recipe_List",
        Key:{"recipe_id": req.query.recipe_id}
    };
    docClient.delete(params,function(err,data){
        if(err){
            log_file.write("recipes::deleteRecipe::error "+ JSON.stringify(err,null,2));
            log_stdout.write("recipes::deleteRecipe::error "+ JSON.stringify(err,null,2));
            res.status(401);
        }else{
            log_file.write("recipes::deleteRecipe::success");
            log_stdout.write("recipes::deleteRecipe::success");
        }
        return next();
    });
}