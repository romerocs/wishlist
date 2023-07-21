
import { createClient } from '@supabase/supabase-js';

const { PUBLIC_DATABASE_URL, PUBLIC_SUPABASE_SERVICE_API_KEY } = import.meta.env;

const supabase = createClient(PUBLIC_DATABASE_URL, PUBLIC_SUPABASE_SERVICE_API_KEY);

export default supabase;