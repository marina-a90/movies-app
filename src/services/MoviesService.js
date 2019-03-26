import { httpService } from "./HttpService";

class MoviesService {
  getAll() {
    return httpService.get("/movies"); 
  }
}

export const moviesService = new MoviesService();