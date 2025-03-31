import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { catchError, of } from 'rxjs';
import { baseUrl } from '../../api/dog-api/endpoints';
import {
  BreedImageResponse,
  BreedListResponse,
  RandomImageResponseByQuantity,
} from '../../api/dog-api/types';
import { dogsNumber } from '../../api/dog-api/variables';

@Injectable({
  providedIn: 'root',
})
export class DogService {
  constructor(private http: HttpClient) {}
  //Fetch Functions
  getAllBreeds() {
    return toSignal(
      this.http
        .get<BreedListResponse>(`${baseUrl}breeds/list/all`)
        .pipe(
          catchError(() =>
            of({ status: 'error', message: {} } as BreedListResponse),
          ),
        ),
      { initialValue: { status: 'success', message: {} } },
    );
  }

  getRandomImageByQuantity() {
    return this.http.get<RandomImageResponseByQuantity>(
      `${baseUrl}breeds/image/random/${dogsNumber}`,
    );
  }

  getBreedImage(breed: string) {
    return this.http.get<BreedImageResponse>(`${baseUrl}breed/${breed}/images`);
  }
  //Favorite Functions
  addFavorite(dog: string): void {
    let favorites = this.getFavorites();
    if (!favorites.includes(dog)) {
      favorites.push(dog);
      localStorage.setItem('favoriteDogs', JSON.stringify(favorites));
    }
  }

  getFavorites(): string[] {
    const storedDogs = localStorage.getItem('favoriteDogs');
    return storedDogs ? JSON.parse(storedDogs) : [];
  }

  removeFavorite(dog: string): void {
    let favorites = this.getFavorites().filter((fav) => fav !== dog);
    localStorage.setItem('favoriteDogs', JSON.stringify(favorites));
  }
}
