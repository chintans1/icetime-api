
/**
 * Return formatted date string in YYYY-MM-DD format
 *
 * @param {Date} date
 */
const dateFormatter = date => date.toISOString().split('T')[0];

module.exports = { dateFormatter };
