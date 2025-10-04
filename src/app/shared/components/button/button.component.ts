import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Button } from './classes/button.class';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-button',
  imports: [FontAwesomeModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {

  @Output() onClicked: EventEmitter<void> = new EventEmitter<void>();
  @Input() config: Button;

}
