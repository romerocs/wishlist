// Grab our credentials from a .env file or environment variables
require("dotenv").config({ path: "../../.env" });

const { DATABASE_URL, SUPABASE_SERVICE_API_KEY } = process.env;

//Connect to our database
const { createClient } = require("@supabase/supabase-js");
const supabase = createClient(DATABASE_URL, SUPABASE_SERVICE_API_KEY);

// Our standard serverless handler function
exports.handler = async (event) => {
  //READ DATA
  let { data: lists, error_read } = await supabase.from("lists").select("*");


  return {
    statusCode: 200,
    body: JSON.stringify(lists),
  };
};

/* 
RETURNED IN THE EVENT OBJECT
{
  path
  httpMethod
  headers
  cookie
  host
  queryStringParameters,
  multiValueQueryStringParameters
}
*/
