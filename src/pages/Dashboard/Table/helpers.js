//format string num in from eg. $24,254.02
export const priceFormatter = (value) =>
  !Number.isInteger(Number(value))
    ? // ? `$${Number(value).toFixed(2)}`
      Number(value).toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      })
    : ` $${Number(value).toLocaleString()}`;

export const handleNullValue = (value) => {
  return value !== null ? Number(value) : 0;
};
