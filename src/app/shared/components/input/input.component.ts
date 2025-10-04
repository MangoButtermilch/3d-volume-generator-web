import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { CustomInput } from './classes/customInput.class';
import { clamp } from '../../utils/math.utils';

@Component({
  selector: 'app-input',
  imports: [],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss'
})
export class InputComponent implements OnInit {

  @Output() onValueChange: EventEmitter<string | number> = new EventEmitter<string | number>();
  @Input() config: CustomInput;
  @ViewChild("inputElement") inputElement: ElementRef<HTMLInputElement>;

  public value: string | number;
  public inputError: boolean = false;

  ngOnInit(): void {
    if (this.getType() === "input") {
      this.value = this.config.value as string;
    } else {
      this.value = this.config.value.toString();
    }
  }

  public onInput(event: Event): void {
    this.value = this.inputElement.nativeElement.value;

    if (this.getType() === "input") {
      this.inputError = false;//TODO
      this.onValueChange.emit(this.value.toString());
      return;
    }

    const numvalue = parseInt(this.value);
    if (Number.isNaN(numvalue) ||
      numvalue < this.config.minAndMax.min ||
      numvalue > this.config.minAndMax.max) {
      this.inputError = true;
      return;
    }
    this.inputError = false;
    this.onValueChange.emit(numvalue);
  }

  public getType(): "input" | "number" {

    if (typeof this.config.value === "string") {
      return "input";
    }

    return "number";
  }
}
