import { httpService } from "./HttpService";

class MoviesService {
  getAll() {
    return httpService.get("/movies?limit=5"); 
  }

  getMovie(id) {
    return httpService.getMovie(id);
  }
}

export const moviesService = new MoviesService();