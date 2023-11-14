import { createClient } from "@supabase/supabase-js";

export const supabase = createClient("https://bhcurpsrskowsgqxdjim.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJoY3VycHNyc2tvd3NncXhkamltIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTk1OTIwMDQsImV4cCI6MjAxNTE2ODAwNH0.SKtmyrEFgHuIKdQcPcPB9UvXQnQhDx9UHhDW9yxl4LM");

export const sendMessage = async (message, board) => {
    const { data, error } = await supabase
        .from("messages")
        .insert([{ content: message, sent_at: new Date(), board: board }]);
};

// Create a function to handle inserts
const newMessage = (payload) => {
console.log('Change received!', payload)
}
  
  // Listen to inserts
  supabase
    .channel('messages')
    .on('supabase_realtime', { event: 'INSERT', schema: 'public', table: 'messages' }, newMessage)
    .subscribe()