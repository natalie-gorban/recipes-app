import axios from "axios";
import { API_URL } from '../config'
const BASE_URL = `${API_URL}auth/`;

class AuthService {
  login(username, password) {
    console.log(`${BASE_URL}signin`);
    return axios
      .post(
        BASE_URL + "signin",
        { username, password },
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      )
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(username, email, password) {
    return axios.post(
      BASE_URL + "signup",
      {
        username,
        email,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  }
}

export default new AuthService();
