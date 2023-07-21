const client = require("./get_client");

exports.handler = async (event) => {
  const body = JSON.parse(event.body);

  const { id, name, url, price, priority, description } = body;

  const list_item = {
    list_item_name: name,
    list_item_url: url ? url : null,
    list_item_priority: priority ? priority : null,
    list_item_price: price ? price : null,
    list_item_description: description ? description : null,
  };

  const { data, error } = await client
    .from("list_items")
    .update(list_item)
    .eq("id", id);

  return {
    statusCode: 200
  };
};
