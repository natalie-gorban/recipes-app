import axios from "axios";

const API_URL = (process.env.API_URL || "http://localhost:5000/api/") + "auth/";

class AuthService {
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

  logout() {
    localStorage.removeItem("user");
  }

  register(username, email, password) {
    return axios.post(API_URL + "signup", {
      username,
      email,
      password,
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  }
}

export default new AuthService();
