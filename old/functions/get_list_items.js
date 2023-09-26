const client = require('./get_client');

// Our standard serverless handler function
exports.handler = async (event) => {
  const { id } = event.queryStringParameters

  let { data: list_items, error_read } = await client.from("list_items")
  .select("*")
  .eq('list_id', id) 

  return {
    statusCode: 200,
    body: JSON.stringify(list_items)
  };
};
