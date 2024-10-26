export const isoDateFormatter = (isoDate) => {
    const date = new Date(isoDate);

    const options = { 
        day: 'numeric', 
        month: 'long', 
        year: 'numeric' 
    };

    return date.toLocaleDateString('en-GB', options);
};
