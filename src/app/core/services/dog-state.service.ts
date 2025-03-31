import { Injectable, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import {
  BreedImageResponse,
  BreedListResponse,
  RandomImageResponseByQuantity,
} from '../../api/dog-api/types';
import { DogService } from './dog.service';

@Injectable({
  providedIn: 'root',
})
export class DogStateService {
  //Signals states
  breeds = signal<BreedListResponse>({
    status: 'success',
    message: {},
  });
  imagesByQuantity = signal<RandomImageResponseByQuantity>({
    status: 'success',
    message: [],
  });
  breedImages = signal<BreedImageResponse>({
    status: 'success',
    message: [],
  });
  isLoading = signal(false);
  error = signal<string | null>(null);
  isShowRandom = signal<boolean>(true);

  constructor(private dogService: DogService) {
    this.loadAllBreeds();
    this.loadRandomImageByQuantity();
  }

  setShowRandom(value: boolean) {
    this.isShowRandom.set(value);
  }

  // Métodos de carga
  async loadAllBreeds() {
    this.isLoading.set(true);
    try {
      const result = this.dogService.getAllBreeds()();
      if (result.status === 'success') {
        this.breeds.set(result);
      }
    } catch (err) {
      this.error.set('Error isLoading breeds');
    } finally {
      this.isLoading.set(false);
    }
  }

  async loadRandomImageByQuantity() {
    this.isLoading.set(true);
    try {
      const result = await firstValueFrom(
        this.dogService.getRandomImageByQuantity(),
      );
      this.imagesByQuantity.set(result);
    } catch (err) {
      console.log(err);
      this.error.set('Error isLoading random images');
    } finally {
      this.isLoading.set(false);
    }
  }

  async loadBreedImages(name: string) {
    this.isLoading.set(true);
    try {
      const result = await firstValueFrom(this.dogService.getBreedImage(name));
      this.breedImages.set(result);
    } catch (err) {
      this.error.set(`Error isLoading images for ${name}`);
    } finally {
      this.isLoading.set(false);
    }
  }
}
