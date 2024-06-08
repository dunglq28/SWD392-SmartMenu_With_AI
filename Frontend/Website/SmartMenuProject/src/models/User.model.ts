export interface UserData {
  fullName: {
    value: string;
    errorMessage: string;
  };
  userName: {
    value: string;
    errorMessage: string;
  };
  phoneNumber: {
    value: string;
    errorMessage: string;
  };
  DOB: {
    value: Date | null;
    errorMessage: string;
  };
  gender: {
    value: string;
    errorMessage: string;
  };
  status: {
    value: number | null;
    errorMessage: string;
  };
}
