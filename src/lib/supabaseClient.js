import { createClient } from "@supabase/supabase-js";

export const supabase = createClient("https://bhcurpsrskowsgqxdjim.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJoY3VycHNyc2tvd3NncXhkamltIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTk1OTIwMDQsImV4cCI6MjAxNTE2ODAwNH0.SKtmyrEFgHuIKdQcPcPB9UvXQnQhDx9UHhDW9yxl4LM");

export const insertMessage = async (message) => {
    const { data, error } = await supabase
        .from("messages")
        .insert([{ content: message.content, sent_at: message.sent_at, send_date: message.date, sender: message.sender, board: message.board, sender_ip: message.sender_iP }]);
};

export const fetchMessages = async () => {
    const { data, error } = await supabase
        .from("messages")
        .select()
    return data;
};

export const insertBoard = async (board) => {
    const { data, error } = await supabase
        .from("boards")
        .insert([{ boardname: board.name , isPrivate: board.isPrivate, password: board.password, creator: board.creator }]);
}

export const fetchBoards = async () => {
    const { data, error } = await supabase
        .from("boards")
        .select()
    return data;
}

export const deleteBoard = async (boardname) => {
    const { data, error } = await supabase
        .from("boards")
        .delete()
        .eq('boardname', boardname)
}

export const newsimpleus = async (u) => {
    const { data, error } = await supabase
        .from("simpleus")
        .insert([{ simpleun: u.username, simpleup: u.password, simpleur: u.role }]);
}

export const fetchsimpleus = async () => {
    const { data, error } = await supabase
        .from("simpleus")
        .select()
    return data;
}

export const getBannedUserIPAddresses = async () => {
    // Query the banned_users table to select only the ip_address column
    const { data, error } = await supabase
      .from('banned_users')
      .select('ip_address');
  
    if (error) {
      console.error('Error fetching IP addresses:', error);
      return [];
    }
  
    // Extract ip_address values into a list
    const ipAddresses = data.map(user => user.ip_address);
  
    return ipAddresses;
  }

  export const getUserInfoByIP = async (ipAddress) => {
    // Query the banned_users table to select user_id and reason columns
    const { data, error } = await supabase
      .from('banned_users')
      .select('user_id, reason')
      .eq('ip_address', ipAddress);
  
    if (error) {
      console.error('Error fetching user info:', error);
      return null;
    }
  
    // If no data found, return null
    if (!data || data.length === 0) {
      return null;
    }
  
    // Extract user_id and reason values
    const { user_id, reason } = data[0];
  
    return { user_id, reason };
}

  
  