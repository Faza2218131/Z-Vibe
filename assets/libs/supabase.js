import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://sjdmwlapxkyxkbzprjgn.supabase.co';
const supabaseAnonKey = 'sb_publishable_zddvcYrlISVI8o_OYMD0uA_8TwlLuYu';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
