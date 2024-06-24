import { UserForm } from "../models/UserForm.model";

export const getInitialUserData = (): UserForm => ({
  fullName: {
    value: "",
    errorMessage: "",
  },
  userName: {
    value: "",
    errorMessage: "",
  },
  phoneNumber: {
    value: "",
    errorMessage: "",
  },
  DOB: {
    value: null,
    errorMessage: "",
  },
  gender: {
    value: "",
    errorMessage: "",
  },
  isActive: {
    value: 0,
    errorMessage: "",
  },
});
