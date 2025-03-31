import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  Component,
  Inject,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { DogStateService } from '../../core/services/dog-state.service';
import { DogService } from '../../core/services/dog.service';
import { HeaderComponent } from '../../layouts/header/header.component';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { ImageCardComponent } from '../../shared/components/image-card/image-card.component';
import { LoadingSpinnerComponent } from '../../shared/components/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    HeaderComponent,
    ImageCardComponent,
    LoadingSpinnerComponent,
    ButtonComponent,
    CommonModule,
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent implements OnInit, AfterViewInit {
  constructor(
    private state: DogStateService,
    private dogService: DogService,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {}

  isClient = false;
  favoriteDogs: string[] = [];
  imageByQuantity: any;
  breedImages: any;
  breed: any;
  isLoading: any;
  error: any;
  isShowRandom: any;
  // Exponer señales del estado

  ngOnInit() {
    this.isClient = isPlatformBrowser(this.platformId);
    this.imageByQuantity = this.state.imagesByQuantity;
    this.breedImages = this.state.breedImages;
    this.breed = this.state.breeds;
    this.isLoading = this.state.isLoading;
    this.error = this.state.error;
    this.isShowRandom = this.state.isShowRandom;
  }

  ngAfterViewInit() {
    this.isClient = true;
  }

  generateNewRandomDogs() {
    this.state.loadRandomImageByQuantity();
    this.state.setShowRandom(true);
  }

  addFavoriteDog(dog: string) {
    this.dogService.addFavorite(dog);
  }
}
