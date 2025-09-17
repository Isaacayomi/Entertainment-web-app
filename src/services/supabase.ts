import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://vsbwpwnjxcbsifvltgof.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZzYndwd25qeGNic2lmdmx0Z29mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgwNTc2NjksImV4cCI6MjA3MzYzMzY2OX0.nC1Y7fkBxXsC-vA5XUkXlrVbbFdpU2FyRiuLXlIEH-o";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
