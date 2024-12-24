
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://qktdcnuwjkfxjmtduybc.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFrdGRjbnV3amtmeGptdGR1eWJjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ0Mzg5NDAsImV4cCI6MjA1MDAxNDk0MH0.2Ur_7m98rHH2upifE5VnVEhvIp8KYUXlNGGJ54RPWWU';

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
