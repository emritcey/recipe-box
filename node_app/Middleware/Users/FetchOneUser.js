const AWS = require("aws-sdk");
const keys = require("../../Keys");

AWS.config.update(keys.awsConfig);

const docClient = new AWS.DynamoDB.DocumentClient();

module.exports = (req, res, next) => {
    const params = {
        TableName: "Recipe_Users",
        Key: {
            "user_name": req.query.user_name
        }
    };

    docClient.get(params, function (err, data) {
        if (err) {
            console.log("users::fetchOneByKey::error - " + JSON.stringify(err, null, 2));
        }
        else {
            console.log("users::fetchOneByKey::success - " + JSON.stringify(data, null, 2));
        }
        res.locals.data = data;
        return next();
    });
};