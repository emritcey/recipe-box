const AWS = require("aws-sdk");
const keys = require("../../Keys");

const fs = require('fs');
const log_file = fs.createWriteStream(__dirname + '/debug.log', { flags:'w' });
const log_stdout = process.stdout;

AWS.config.update(keys.awsConfig);
const docClient = new AWS.DynamoDB.DocumentClient();

module.exports = (req, res, next) => {
    const input = {
        "recipe_id": req.body.recipe_id,
        "recipe_name": req.body.recipe_name,
        "cook_time":req.body.cook_time,
        "servings":req.body.servings,
        "ingredients": req.body.ingredients,
        "directions":req.body.directions,
        "updated_by": req.body.userName,
        "updated_on": new Date().toString(),
    };

    // Not required inputs
    if (req.body.prep_time && req.body.prep_time.length > 0) { input["prep_time"] = req.body.prep_time; }
    if (req.body.description && req.body.description.length > 0) { input["description"] = req.body.description; }

    const params = {
        TableName: "Recipe_List",
        Item: input,
    };

    docClient.put(params, function (err, data) {
        if (err) {
            log_file.write(new Date().toString() + ": recipes::updateRecipe::error "+ JSON.stringify(err,null,2));
            log_stdout.write(new Date().toString() + ": recipes::updateRecipe::error " + JSON.stringify(err,null,2));
            res.locals.error = err;
        } else {
            log_file.write(new Date().toString() + ": recipes::updateRecipe::success: " + req.params.id + "\r\n");
            log_stdout.write(new Date().toString() + ": recipes::updateRecipe::success: " + req.params.id + "\r\n");
            res.locals.updatedRecipe = true;
        }
        return next();
    })
};