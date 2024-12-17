export const isoDateFormatter = (isoDate) => {
    const date = new Date(isoDate);

    const options = { 
        day: 'numeric', 
        month: 'long', 
        year: 'numeric',
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    };

    return date.toLocaleDateString('en-GB', options);
};
