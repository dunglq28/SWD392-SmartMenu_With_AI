import axiosMultipartForm from "../api/axiosMultipartForm";

export const recommendMenu = async (form) => {
  try {
    console.log(form);
    const response = await axiosMultipartForm.post("/menus/recomend-menu", form);
    return response;
  } catch (error) {
    throw error;
  }
};
