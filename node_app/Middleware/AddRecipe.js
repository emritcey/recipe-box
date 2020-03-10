const AWS = require("aws-sdk");
const keys = require("../Keys");

const fs = require('fs');
const log_file = fs.createWriteStream(__dirname + '/add_recipe_debug.log', {flags:'w'});
const log_stdout = process.stdout;

AWS.config.update(keys.awsConfig);

const docClient = new AWS.DynamoDB.DocumentClient();

module.exports = (req,res,next) => {
    const input = {
        "recipe_id": req.query.recipe_id,
        "recipe_name":req.query.recipe_name,
        "created_by": req.query.user_name,
        "created_on":new Date().toString(),
        "updated_by":req.query.user_name,
        "updated_on":new Date().toString(),
        "is_deleted": false
    }
    const params = {
        TableName:"Recipe_List",
        Item:input
    }
    docClient.put(params,function(err,data){
        if(err){
            log_file.write("recipes::addRecipe::error "+ JSON.stringify(err,null,2));
            log_stdout.write("recipes::addRecipe::error "+ JSON.stringify(err,null,2));
            res.status(401);
        }else{
            log_file.write("recipes::addRecipe::success");
            log_stdout.write("recipes::addRecipe::success");
        }
        return next();
    })
}

