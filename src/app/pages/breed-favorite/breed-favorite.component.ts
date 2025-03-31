import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  Component,
  Inject,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { DogService } from '../../core/services/dog.service';
import { HeaderComponent } from '../../layouts/header/header.component';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { ImageCardComponent } from '../../shared/components/image-card/image-card.component';

@Component({
  selector: 'app-breed-favorite',
  imports: [HeaderComponent, ImageCardComponent, ButtonComponent, CommonModule],
  templateUrl: './breed-favorite.component.html',
  styleUrl: './breed-favorite.component.scss',
})
export class BreedFavoriteComponent implements OnInit, AfterViewInit {
  constructor(
    private dogService: DogService,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {}

  isClient = false;
  favorites: string[] = [];

  ngOnInit() {
    this.isClient = isPlatformBrowser(this.platformId);
    this.favorites = this.dogService.getFavorites();
  }

  ngAfterViewInit() {
    this.isClient = true;
  }

  removeFavorite(dog: string) {
    this.dogService.removeFavorite(dog);
    this.favorites = this.favorites.filter((fav) => fav !== dog);
  }
}
