// Grab our credentials from a .env file or environment variables
require("dotenv").config({ path: "../../.env" });

const { DATABASE_URL, SUPABASE_SERVICE_API_KEY } = process.env;

//Connect to our database
const { createClient } = require("@supabase/supabase-js");
const supabase = createClient(DATABASE_URL, SUPABASE_SERVICE_API_KEY);

// Our standard serverless handler function
exports.handler = async (event) => {
  const { name } = JSON.parse(event.body);

  const { data, error } = await supabase
    .from("lists")
    .insert([{ list_name: name }])
    .select();

  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };
};
