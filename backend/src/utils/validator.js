function isValidPhone(phone) {
  return /^[0-9]{10}$/.test(phone);
}

module.exports = { isValidPhone };
