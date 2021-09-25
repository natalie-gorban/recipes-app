import http from "../helpers/http-common";
import authHeader from "./auth-header";
const API_URL = `${process.env.API_URL || "http://localhost:5000/api/"}recipe/`;

class RecipeService {
  add(formData, imageName, recipeId = undefined) {
    console.log(
      "RecipeService.add formData, imageName, recipeId",
      formData,
      imageName,
      recipeId
    );
    formData.imageName = imageName;
    formData.recipeId = recipeId; // can be undefined for a new recipe

    return http
      .post(`${API_URL}add`, formData, {
        headers: {
          ...authHeader(),
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        return response.data;
      });
  }

  delete(recipeId) {
    console.log("RecipeService.delete", recipeId);
    return http.post(
      `${API_URL}delete`,
      { recipeId },
      {
        headers: {
          ...authHeader(),
          "Content-Type": "application/json",
        },
      }
    );
  }

  get(recipeId) {
    console.log("RecipeService.get", recipeId);
    return http
      .get(
        `${API_URL}get`,
        { recipeId },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        return response.data;
      });
  }
}

export default new RecipeService();
