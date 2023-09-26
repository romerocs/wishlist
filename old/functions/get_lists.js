const client = require('./get_client');

// Our standard serverless handler function
exports.handler = async (event) => {
  let { data: lists, error_read } = await client.from("lists").select("*");

  return {
    statusCode: 200,
    body: JSON.stringify(lists),
  };
};
