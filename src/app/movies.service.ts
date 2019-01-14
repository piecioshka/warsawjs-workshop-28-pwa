import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Movies } from './interfaces/movies.interface';
import { Movie } from './interfaces/movie.interface';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(
    private http: HttpClient
  ) { }

  async getMovies(): Promise<Movies> {
    return this.http.get<Movies>('/assets/movies.json').toPromise();
  }

  async getMovieById(id: string): Promise<Movie> {
    const movies = await this.getMovies();
    return movies.find(movie => movie.id === id);
  }

}
