const isEmpty = (value) =>
        value === undefined ||
        value === null ||
        (typeof value === "object" && Object.keys(value).length === 0)||
        (typeof value === "string" && value.trim().length === 0);

        module.exports = isEmpty;
    


// check for null or undefined values or empty object or string
// where as validator will only check for empty string