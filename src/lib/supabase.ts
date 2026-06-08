import { createClient } from '@supabase/supabase-js';


// Initialize database client
const supabaseUrl = 'https://lrkquslsqnlpsxomwzex.databasepad.com';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImFjMmIxMDgxLTgyMTMtNDllZS05N2QxLTMyNDQ2ZDUwNzQ5ZiJ9.eyJwcm9qZWN0SWQiOiJscmtxdXNsc3FubHBzeG9td3pleCIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNzgwODk1OTc0LCJleHAiOjIwOTYyNTU5NzQsImlzcyI6ImZhbW91cy5kYXRhYmFzZXBhZCIsImF1ZCI6ImZhbW91cy5jbGllbnRzIn0.P3ECK6xsxlaWZ699R5NJe9SU6Aew5RHHjXOFAqNfKxI';
const supabase = createClient(supabaseUrl, supabaseKey);


export { supabase };