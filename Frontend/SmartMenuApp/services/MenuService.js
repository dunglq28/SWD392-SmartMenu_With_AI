import axiosMenu from "../api/axiosMenu";

export const recommendMenu = async (faceImage, BrandId) => {
  try {
    const response = await axiosMenu.post("/menus/recomend-menu", {
      faceImage,
      BrandId,
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
