// Grab our credentials from a .env file or environment variables
require("dotenv").config({ path: "../../.env" });

const { DATABASE_URL, SUPABASE_SERVICE_API_KEY } = process.env;

//Connect to our database
const { createClient } = require("@supabase/supabase-js");
const client = createClient(DATABASE_URL, SUPABASE_SERVICE_API_KEY);

module.exports = client;