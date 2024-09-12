export const getTimeNow = () =>{
    const now = new Date();
    const formattedDate = now.toLocaleString();
    return formattedDate
}