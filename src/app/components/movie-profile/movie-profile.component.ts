import { Component, OnInit, Input } from '@angular/core';

import { Movie } from 'src/app/interfaces/movie.interface';

@Component({
  selector: 'app-movie-profile',
  templateUrl: './movie-profile.component.html',
  styleUrls: ['./movie-profile.component.css']
})
export class MovieProfileComponent implements OnInit {

  @Input() movie: Movie = null;

  constructor() { }

  ngOnInit() {
  }

}
