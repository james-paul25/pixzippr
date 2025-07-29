export const formatDate = (dateStr) => {
    if (!dateStr) return "";

    const dateTimeString = `${dateStr}`;
    const date = new Date(dateTimeString);

    const formattedDate = date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    return `${formattedDate}`;
}