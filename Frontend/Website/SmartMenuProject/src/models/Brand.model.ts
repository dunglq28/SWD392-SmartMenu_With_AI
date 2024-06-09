export interface BrandData {
  brandName: {
    value: string;
    errorMessage: string;
  };
  image: {
    value: File | null;
    errorMessage: string;
  };
}
