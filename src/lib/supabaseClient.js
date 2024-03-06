import { createClient } from "@supabase/supabase-js";

export const supabase = createClient("https://bhcurpsrskowsgqxdjim.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJoY3VycHNyc2tvd3NncXhkamltIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTk1OTIwMDQsImV4cCI6MjAxNTE2ODAwNH0.SKtmyrEFgHuIKdQcPcPB9UvXQnQhDx9UHhDW9yxl4LM");

export const insertMessage = async (message) => {
    const { data, error } = await supabase
        .from("messages")
        .insert([{ content: message.content, sent_at: message.sent_at, sender: message.sender, board: message.board }]);
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