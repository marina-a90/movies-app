import { httpService } from "./HttpService";

class MoviesService {
  getAll() {
    return httpService.get("/movies"); 
  }

  getMovie(id) {
    return httpService.getMovie(id);
  }
}

export const moviesService = new MoviesService();