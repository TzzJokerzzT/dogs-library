import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-button',
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent {
  //Input event
  @Input() ariaLabel: string = '';
  @Input() buttonType: 'button' | 'submit' | 'reset' = 'button';
  @Input() color: string | null = '';
  @Input() disabled: boolean = false;
  @Input() tabindex: string | number = '';
  @Input() text: string = '';
  @Input() icon: string = '';
  //Output event
  @Output() clicked = new EventEmitter<Event>();

  //Handle Click
  handleClick(event: Event) {
    this.clicked.emit(event);
  }
}
