import { UserRole } from "../constants/Enum";

export const getRoleName = (roleId: number): string => {
  if (roleId === UserRole.BrandManager) {
    return "Brand Manager";
  } else if (roleId === UserRole.BranchManager) {
    return "Branch Manager";
  }
  return UserRole[roleId] || "Unknown Role";
};
