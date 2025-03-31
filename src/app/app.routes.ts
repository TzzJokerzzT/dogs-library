import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { BreedFavoriteComponent } from './pages/breed-favorite/breed-favorite.component';

export const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'favorite', component: BreedFavoriteComponent },
];
