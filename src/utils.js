export const getTotals = (cart) => {
  let totalItems = 0;
  let totalAmount = 0;

  for (let { price, amount } of cart.values()) {
    totalItems += amount;
    totalAmount += price * amount;
  }

  return { totalItems, totalAmount };
};
