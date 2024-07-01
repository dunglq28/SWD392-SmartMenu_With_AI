export const formatCurrency = (amount: string): string => {
  const number = parseFloat(amount.replace(/,/g, "")); 
  if (isNaN(number)) {
    return amount; 
  }
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(number);
};
