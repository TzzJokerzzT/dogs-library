import { AsyncPipe } from '@angular/common';
import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { map, Observable, startWith } from 'rxjs';
import { DogStateService } from '../../../core/services/dog-state.service';

@Component({
  selector: 'app-input',
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    AsyncPipe,
  ],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
})
export class InputComponent implements OnInit {
  //State
  private state = inject(DogStateService);
  //Variables
  myControl = new FormControl();
  filteredOptions!: Observable<string[]>;
  name: string = '';
  //@Inputs
  @Input() options: string[] = [];
  @Input() value: string = '';
  @Output() inputDog: EventEmitter<string> = new EventEmitter<string>();

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || '')),
    );
    this.myControl.valueChanges.subscribe((value) => {
      this.name = value.toLowerCase();
    });
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.map(
      (element) =>
        element.charAt(0).toUpperCase() + element.slice(1).toLowerCase(),
    );
  }

  sendName() {
    if (this.myControl.value) {
      this.inputDog.emit(this.myControl.value.toLowerCase());
    }
  }
}
