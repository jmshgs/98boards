import { createClient } from "@supabase/supabase-js";

export const supabase = createClient("https://bhcurpsrskowsgqxdjim.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJoY3VycHNyc2tvd3NncXhkamltIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTk1OTIwMDQsImV4cCI6MjAxNTE2ODAwNH0.SKtmyrEFgHuIKdQcPcPB9UvXQnQhDx9UHhDW9yxl4LM");

export const insertMessage = async (message) => {
    const { data, error } = await supabase
        .from("messages")
        .insert([{ content: message.content, sent_at: message.sent_at, send_date: message.date, sender: message.sender, board: message.board, sender_ip: message.sender_iP, file_url: message.file_url, file_type: message.file_type, played_sound: message.played_sound }]);
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
    const { data, error } = await supabase
      .from('banned_users')
      .select('ip_address');
  
    if (error) {
      console.error('Error fetching IP addresses:', error);
      return [];
    }
  
    const ipAddresses = data.map(user => user.ip_address);
  
    return ipAddresses;
  }

  export const getUserInfoByIP = async (ipAddress) => {
    const { data, error } = await supabase
      .from('banned_users')
      .select('user_id, reason')
      .eq('ip_address', ipAddress);
  
    if (error) {
      console.error('Error fetching user info:', error);
      return null;
    }
  
    if (!data || data.length === 0) {
      return null;
    }
  
    const { user_id, reason } = data[0];
  
    return { user_id, reason };
}

export const getAllBannedUserData = async () => {
  const { data, error } = await supabase
    .from('banned_users')
    .select('*');

  if (error) {
    console.error('Error fetching banned users data:', error);
    return [];
  }

  return data;
};  

export const deleteBannedUser = async (ip_address) => {
  const { data, error } = await supabase
    .from('banned_users')
    .delete()
    .eq('ip_address', ip_address);

  if (error) {
    console.error('Error deleting user:', error);
    return false;
  }

  return true;
};

export const pullUsername = async () => {
  const { data, error } = await supabase
    .from('usernames')
    .select("*")
  if (error) {
    throw error;
  }
  return data;
}

export const pushUsername = async (username, time_made) => {
  const { data, error } = await supabase
    .from('usernames')
    .insert([{ username, time_made }]);
  if (error) {
    throw error;
  }
  return data;
};

export const getTimeMade = async (username) => {
  const { data, error } = await supabase
    .from('usernames')
    .select('time_made')
    .eq('username', username)
    .single(); 
  if (error) {
    throw error;
  }
  return data ? data.time_made : null;
};

export const pushDelUsername = async (username) => {
  const { data, error } = await supabase
    .from('usernames')
    .delete()
    .eq('username', username); 
  if (error) {
    console.error('Error deleting user:', error);
    return false;
  }
  return true;
};


const BASE_URL = 'https://bhcurpsrskowsgqxdjim.supabase.co/storage/v1/object/public/images/';

export async function uploadImage(file) {
  try {
    const { data, error } = await supabase.storage
      .from('images')
      .upload(`images/${Date.now()}_${file.name}`, file);

    if (error) {
      console.error('Error uploading image:', error);
      return null;
    }

    if (!data || !data.path) {
      console.error('Upload successful but no data.path found');
      return null;
    }

    console.log('Upload successful:', data);

    const imagePath = data.path; 
    const publicURL = `${BASE_URL}${imagePath}`;

    console.log('Public URL:', publicURL);

    return publicURL;
  } catch (err) {
    console.error('Unexpected error:', err);
    return null;
  }
}

export const getPlayedSound = async (messageId) => {
  const { data, error } = await supabase
      .from("messages")
      .select("played_sound")
      .eq("id", messageId) 
      .single();

  if (error) {
      console.error("Error fetching played_sound:", error);
      return null; 
  }

  return data.played_sound;
};

export const markSoundAsPlayed = async (messageId) => {
  const { data, error } = await supabase
      .from("messages")
      .update({ played_sound: true })
      .eq("id", messageId); 
  if (error) {
      console.error("Error updating played_sound:", error);
      return false; 
  }

  return true;
};

export async function downloadFile(filePath) {
  console.log(filePath)
  const { data, error } = await supabase.storage
    .from('images')
    .download(filePath);

  if (error) {
    console.error('Error downloading file:', error.message);
    return { data: null, error };
  }

  const fileUrl = URL.createObjectURL(data);

  const a = document.createElement('a');
  a.href = fileUrl;
  a.download = filePath.split('/').pop();
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);

  URL.revokeObjectURL(fileUrl);

  return { data, error: null };
}
