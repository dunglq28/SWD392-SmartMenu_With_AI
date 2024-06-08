export const generateUsername = (brandName: string): string => {
  const sanitizedBrandName = removeVietnameseTones(brandName)
    .replace(/[^a-zA-Z0-9]/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase())
    .replace(/\s+/g, "")
    .trim();

  const username = `${sanitizedBrandName}SmartMenu`;

  const maxLength = 30;
  if (username.length > maxLength) {
    return username.substring(0, maxLength);
  }

  return username;
};

const removeVietnameseTones = (str: string): string => {
  str = str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  str = str.replace(/đ/g, "d").replace(/Đ/g, "D");
  return str;
};
