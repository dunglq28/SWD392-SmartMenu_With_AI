import axiosMultipartForm from "../api/axiosMultipartForm";

export const recommendMenu = async (form) => {
  try {
    const response = await axiosMultipartForm.post("menus/recommend-menu", form);
    return response;
  } catch (error) {
    throw error;
  }
};
