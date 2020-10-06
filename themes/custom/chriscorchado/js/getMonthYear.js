export const getMonthYear = (dateString) => {
    let newDate = new Date(dateString);
    return (newDate.toLocaleString('default', { month: 'long' }) +
        ' ' +
        newDate.getFullYear().toString());
};
