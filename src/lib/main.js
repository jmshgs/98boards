export function timeConverter(unixTimestamp){
    // Convert to milliseconds and
    // then create a new Date object
    let dateObj = new Date(unixTimestamp * 1000);
    let utcString = dateObj.toLocaleTimeString();
 
    let time = utcString.slice(-11, -4);
 
    return time;
}