import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreedFavoriteComponent } from './breed-favorite.component';

describe('BreedFavoriteComponent', () => {
  let component: BreedFavoriteComponent;
  let fixture: ComponentFixture<BreedFavoriteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BreedFavoriteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BreedFavoriteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
