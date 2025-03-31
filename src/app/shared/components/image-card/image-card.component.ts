import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-image-card',
  imports: [MatCardModule],
  templateUrl: './image-card.component.html',
  styleUrl: './image-card.component.scss',
})
export class ImageCardComponent {
  @Input() content: string = '';
  @Input() title: string = '';
  @Input() imgName: string = '';
}
