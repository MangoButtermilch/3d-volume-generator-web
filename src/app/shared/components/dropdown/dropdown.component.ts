import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Dropdown } from './classes/dropdown.class';

@Component({
  selector: 'app-dropdown',
  imports: [],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.scss'
})
export class DropdownComponent implements OnInit {

  @Input() config: Dropdown;
  @ViewChild("selectElement") selectElement: ElementRef<HTMLSelectElement>;

  public value: string | number;

  ngOnInit(): void {
    this.value = this.config.value;
  }

  public onInput(event: Event): void {
    const value = this.selectElement.nativeElement.value;
    this.value = value;
  }

}

