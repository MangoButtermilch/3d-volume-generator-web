import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Checkbox } from './classes/checkbox.class';

@Component({
  selector: 'app-checkbox',
  imports: [FontAwesomeModule],
  templateUrl: './checkbox.component.html',
  styleUrl: './checkbox.component.scss'
})
export class CheckboxComponent implements OnInit {

  @Output() onValueChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() config: Checkbox;
  @ViewChild("checkmarkElement") checkmarkElement: ElementRef<HTMLInputElement>;

  public checkmarkIcon = faCheck;
  public checked: boolean = false;

  ngOnInit(): void {
    this.checked = this.config.checked;
  }

  public onCheck(event: Event): void {
    const checked = this.checkmarkElement.nativeElement.checked;
    this.checked = checked;
    this.onValueChange.emit(checked);
  }
}
