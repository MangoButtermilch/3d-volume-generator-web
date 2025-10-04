import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Dropdown } from './classes/dropdown.class';

@Component({
  selector: 'app-dropdown',
  imports: [],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.scss'
})
export class DropdownComponent implements OnInit {

  @Output() onValueChange = new EventEmitter<Dropdown>();
  @Input() config: Dropdown;
  @ViewChild("selectElement") selectElement: ElementRef<HTMLSelectElement>;

  public value: string | number;

  ngOnInit(): void {
    this.value = this.config.value;
  }

  public onInput(event: Event): void {
    const value = this.selectElement.nativeElement.value;
    this.value = value;
    this.config.value = value;
    this.onValueChange.emit(this.config);
  }

}

