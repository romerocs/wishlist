// Grab our credentials from a .env file or environment variables
require('dotenv').config({ path: '../../.env' });

const {
    DATABASE_URL,
    SUPABASE_SERVICE_API_KEY
} = process.env;

//Connect to our database 
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(DATABASE_URL, SUPABASE_SERVICE_API_KEY);

// Our standard serverless handler function
exports.handler = async event => {

  // // Insert a row
  //   const { data, error } = await supabase
  //       .from('list')
  //       .insert([
  //           { note: 'Chris Suprise & Delight (serverless function)' },
  //       ]);

  // // Did it work?
  // console.log(data, error);

let { data, error } = await supabase
.from('list')
.select('*');

console.log(data);

return data;

}