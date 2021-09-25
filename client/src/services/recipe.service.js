import http from "../helpers/http-common";
import authHeader from "./auth-header";
import { API_URL } from '../config'
const BASE_URL = `${API_URL}recipe/`;

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
      .post(`${BASE_URL}add`, formData, {
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
      `${BASE_URL}delete`,
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
        `${BASE_URL}get`,
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
