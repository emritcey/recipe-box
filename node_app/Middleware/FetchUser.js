const AWS = require("aws-sdk");
const Buffer = require("buffer").Buffer;
const keys = require("../Keys");

const fs = require('fs');
const log_file = fs.createWriteStream(__dirname + '/fetch_user_debug.log', { flags: 'w' });
const log_stdout = process.stdout;

AWS.config.update(keys.awsConfig);

const docClient = new AWS.DynamoDB.DocumentClient();

module.exports = (req, res, next) => {
    const encodedUsername = req.headers.authorization.replace("Basic ", "");
    const decodedUsername = Buffer.from(encodedUsername, 'base64').toString('ascii');
    console.log(decodedUsername);
    const params = {
        TableName: "Recipe_Users",
        Key: {
            "user_name": decodedUsername,
        }
    };

    docClient.get(params, function (err, data) {
        if (err) {
            log_file.write(JSON.stringify(err, null, 2));
            log_stdout.write(JSON.stringify(err, null, 2));
            res.locals.error = err;
        }
        else {
            JSON.stringify(data.Item) ? res.locals.validUser = true : res.locals.nonValidUser = true;
        }
        return next();
    });
};