export function formatDate(dateString : string) {
    const date = new Date(dateString);
    const day = date.getUTCDate(); // Get the day of the month
    const month = date.getUTCMonth() + 1; // Months are 0-indexed
    const year = date.getUTCFullYear(); // Get the year

    return `${day} / ${month} / ${year}`;
}