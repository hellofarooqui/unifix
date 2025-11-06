const parseDate = (value) => {
  if (!value) return null;
  const d = new Date(value);
  return isNaN(d) ? null : d;
}

export default parseDate