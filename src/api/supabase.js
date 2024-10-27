import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://aozsdecwyxsqloouivxy.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFvenNkZWN3eXhzcWxvb3Vpdnh5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjk4NzM4MDYsImV4cCI6MjA0NTQ0OTgwNn0.mgN-p3jn_NGrI3CMHwPikro8mRGyICM6lWCPvLHT7Sw";
const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;
