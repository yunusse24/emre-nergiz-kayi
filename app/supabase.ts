import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://mpfmmxfcnsbehjfcufft.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1wZm1teGZjbnNiZWhqZmN1ZmZ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAzODAwNTAsImV4cCI6MjA4NTk1NjA1MH0.gDbxQXjkZv50EVGcTVBIoKsj_VThYbM6n_DQ7-GzSoY';

export const supabase = createClient(supabaseUrl, supabaseKey);