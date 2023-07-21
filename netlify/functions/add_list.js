const client = require('./get_client');

// Our standard serverless handler function
exports.handler = async (event) => {
  const { name } = JSON.parse(event.body);

  const { data, error } = await client
    .from("lists")
    .insert([{ list_name: name }])
    .select();

  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };
};
