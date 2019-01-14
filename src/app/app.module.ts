import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app/app.component';

import { PageHomeComponent } from './components/page-home/page-home.component';
import { PageMovieProfileComponent } from './components/page-movie-profile/page-movie-profile.component';
import { MovieListComponent } from './components/movie-list/movie-list.component';
import { MovieListItemComponent } from './components/movie-list-item/movie-list-item.component';
import { MovieProfileComponent } from './components/movie-profile/movie-profile.component';

import { environment } from 'src/environments/environment.prod';

@NgModule({
  declarations: [
    AppComponent,
    PageHomeComponent,
    PageMovieProfileComponent,
    MovieListComponent,
    MovieListItemComponent,
    MovieProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ServiceWorkerModule.register('/service-worker.js', { enabled: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
