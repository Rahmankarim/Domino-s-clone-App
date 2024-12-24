import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://xtphhfpnbdgnxqaxkmgs.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh0cGhoZnBuYmRnbnhxYXhrbWdzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM5MTMxMjIsImV4cCI6MjA0OTQ4OTEyMn0.b2Fn5y28YOFHrKR2Wp-r5OJk5OVxC3B7MpYOQwyAquA"

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})