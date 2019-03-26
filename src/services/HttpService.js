
import axios from "axios";

const http = axios.create({
  baseURL: "http://localhost:3000/api"
});

class HttpService {
  get(url) {
    return http.get(url);
  }
}

export const httpService = new HttpService();