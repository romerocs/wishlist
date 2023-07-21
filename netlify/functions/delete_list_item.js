const client = require('./get_client');

exports.handler = async (event) => {
  const body = JSON.parse(event.body);

  const { id } = body;

  const { data, error } = await client
  .from('list_items')
  .delete()
  .eq('id', id);

  return {
    statusCode: 200
  };
};