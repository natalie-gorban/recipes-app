import http from "../helpers/http-common";
import authHeader from './auth-header';

class RecipeService {
  add(formData, imageName, recipeId) {
    console.log('RecipeService.add', formData, imageName, recipeId);

    formData.append('imageName', imageName);
    formData.append('recipeId', recipeId); // can be undefined for a new recipe

    return http.post("/test", formData, {
      headers: {
        ...authHeader(),
        "Content-Type": "multipart/form-data",
      }
    })
  }

  login(username, password) {
    console.log(`${API_URL}signin`)
    return axios
      .post(API_URL + "signin", { username, password }, {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      })
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  get(recipeId) {
    console.log('RecipeService.get', recipeId);

    return http.post("/test", {recipeId}, {
        headers: {
          ...authHeader(),
          'Content-Type': 'application/json',
        }
      })
      .then((response) => {
        return response.data;
      });
  }

  delete(recipeId) {
    console.log('RecipeService.delete', recipeId);

    return http.post("/test", {recipeId}, {
        headers: {
          ...authHeader(),
          'Content-Type': 'application/json',
        }
      })
  }
}

export default new RecipeService();
