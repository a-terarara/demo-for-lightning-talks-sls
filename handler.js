'use strict';
const AWS = require('aws-sdk');
const lambda = new AWS.Lambda();
const hello = (event, context, callback) => {
  const responseForHowDoYouDo =
    process.env.IS_LOCAL || process.env.IS_OFFLINE ?
    howDoYouDo(event, context, (err, data) => data) :
    lambda.invokeAsync({FunctionName: 'howDoYouDo'},
      (err, data) => data
    );

  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: `hello!  ${responseForHowDoYouDo.message}`
    }),
  };

  callback(null, response);
};

const howDoYouDo = (event, context, callback) =>
  callback(null, { message: "how do you do?" });
module.exports = {
  hello,
  howDoYouDo
}
