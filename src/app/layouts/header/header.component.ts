import { Component, inject, Input } from '@angular/core';
import { Router } from '@angular/router';
import { DogStateService } from '../../core/services/dog-state.service';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { InputComponent } from '../../shared/components/input/input.component';

@Component({
  selector: 'app-header',
  imports: [ButtonComponent, InputComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  constructor(private router: Router) {}

  private state = inject(DogStateService);

  nameDogs: string[] = [];
  inputDog: string = 'african';
  @Input() isShowRandom!: boolean;
  breedImages = this.state.breedImages;

  ngOnInit() {
    this.getListNameDog();
    this.state.loadBreedImages(this.inputDog);
  }

  getBreedsList(): { name: string; subbreeds: string[] }[] {
    return Object.entries(this.state.breeds().message).map(
      ([name, subbreeds]) => ({
        name,
        subbreeds,
      }),
    );
  }

  handleInput(value: string) {
    this.inputDog = value;
  }

  getListNameDog() {
    this.nameDogs = this.getBreedsList().map((element) => element.name);
  }

  searchDog() {
    this.state.loadBreedImages(this.inputDog);
    this.state.setShowRandom(false);
  }

  goToFavoritePage() {
    this.router.navigate(['/favorite']);
  }

  goToHomePage() {
    this.router.navigate(['/']);
  }
}
