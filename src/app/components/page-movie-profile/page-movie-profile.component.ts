import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MoviesService } from 'src/app/movies.service';
import { Movie } from 'src/app/interfaces/movie.interface';

@Component({
  selector: 'app-page-movie-profile',
  templateUrl: './page-movie-profile.component.html',
  styleUrls: ['./page-movie-profile.component.css']
})
export class PageMovieProfileComponent implements OnInit {

  movie: Movie = null;

  constructor(
    private route: ActivatedRoute,
    private moviesService: MoviesService,
  ) { }

  ngOnInit() {
    this.setupMovie();
  }

  async setupMovie() {
    const id = this.route.snapshot.params.id;
    this.movie = await this.moviesService.getMovieById(id);
  }

}
