// Grab our credentials from a .env file or environment variables
require("dotenv").config({ path: "../../.env" });

const { DATABASE_URL, SUPABASE_SERVICE_API_KEY } = process.env;

//Connect to our database
const { createClient } = require("@supabase/supabase-js");
const supabase = createClient(DATABASE_URL, SUPABASE_SERVICE_API_KEY);

// Our standard serverless handler function
exports.handler = async (event) => {

  //INSERT DATA
    // const { data, error_insert } = await supabase
    //     .from('lists')
    //     .insert([
    //         { list_name: 'Chris Suprise & Delight (serverless function)' },
    //     ]);

  //READ DATA
  let { data: lists, error_read } = await supabase.from("lists").select("list_name");

  return {
		statusCode: 200,
		body: JSON.stringify(lists)
  }
}
