import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faXmarkCircle } from '@fortawesome/free-solid-svg-icons';
import { Slider } from './classes/slider.class';
import { clamp } from '../../utils/math.utils';

@Component({
  selector: 'app-slider',
  imports: [FontAwesomeModule],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.scss'
})
export class SliderComponent implements OnInit, AfterViewInit {

  @Output() onValueChange: EventEmitter<number> = new EventEmitter<number>();
  @Input() config: Slider;
  @ViewChild("sliderElement") sliderElement: ElementRef<HTMLInputElement>;

  private startValue: number;
  public sliderValue: number;
  public resetIcon = faXmarkCircle;
  public progressWidth: string = "";

  ngOnInit(): void {
    this.sliderValue = clamp(
      this.config.value,
      this.config.minValue,
      this.config.maxValue
    );
    this.startValue = this.sliderValue;
    this.updateProgress();
  }

  ngAfterViewInit(): void {
    this.updateProgress();
  }

  private updateProgress() {
    const min = this.config.minValue;
    const max = this.config.maxValue;
    const val = this.sliderValue;

    const progressPercent = ((val - min) / (max - min));
    const handleOffset = 12;
    this.progressWidth = `calc((${this.config.width}px - ${handleOffset}px) * ${progressPercent})`;
  }

  public onInput(e: Event): void {
    this.sliderValue = clamp(
      parseFloat(this.sliderElement.nativeElement.value || "0"),
      this.config.minValue,
      this.config.maxValue
    );
    this.updateProgress();
    this.onValueChange.emit(this.sliderValue);
  }

  public onResetSlider(): void {
    this.sliderValue = this.startValue;
    this.updateProgress();
  }

  public getSliderValue(): number {
    return this.sliderValue;
  }

  public get width(): string {
    return `${this.config.width}px`;
  }

}
