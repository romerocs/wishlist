const client = require('./get_client');

const { data, error } = await supabase.auth.signInWithOAuth({
  provider: 'google'
});

