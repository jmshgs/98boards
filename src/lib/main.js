export function timeConverter(unixTimestamp){
    // Convert to milliseconds and
    // then create a new Date object
    let dateObj = new Date(unixTimestamp * 1000);
    let utcString = dateObj.toLocaleTimeString();
 
    let time = utcString.slice(-11, -3);
 
    return time;
}

export const changeTheme = (themeColor) => {
    let themesCSS = ""
    switch (themeColor) {
        case "auto":
            themesCSS = "bg-gray-50 text-black dark:bg-gray-950 dark:text-gray-50"
            break
        case "light":
            themesCSS = "bg-gray-50 text-black"
            break
        case "dark":
            themesCSS = "bg-gray-950 text-gray-50"
            break
    }
    return themesCSS
}