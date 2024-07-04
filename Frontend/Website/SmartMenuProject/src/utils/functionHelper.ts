import { UserRole } from "../constants/Enum";

export const getOptions = (total: number): number[] => {
  if (total > 50) return [5, 10, 20, 50, 100];
  if (total > 20) return [5, 10, 20, 50];
  if (total > 10) return [5, 10, 20];
  if (total > 5) return [5, 10];
  return [5];
};

export const getBrandOptions = (total: number): number[] => {
  if (total > 50) return [6, 10, 20, 50, 100];
  if (total > 20) return [6, 10, 20, 50];
  if (total > 10) return [6, 10, 20];
  if (total > 6) return [6, 10];
  return [6];
};

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

export const getRoleName = (roleId: number): string => {
  if (roleId === UserRole.BrandManager) {
    return "Brand Manager";
  } else if (roleId === UserRole.BranchManager) {
    return "Branch Manager";
  }
  return UserRole[roleId] || "Unknown Role";
};

export const capitalizeWords = (str: string) => {
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};


