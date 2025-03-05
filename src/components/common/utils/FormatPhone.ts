export const formatPhone = (phone: string) => {
    // Extract country code and number
    if (!phone) return "";
    const match = phone.match(/^\+(\d+?)(\d{3})(\d{3})(\d{4})$/);
    if (!match) return phone;
    const [, countryCode, area, prefix, line] = match;
    return `+${countryCode} (${area}) ${prefix}-${line}`;
};