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
export class SliderComponent implements OnInit {

  @Output() onValueChange: EventEmitter<Slider> = new EventEmitter<Slider>();
  @Input() config: Slider;
  @ViewChild("sliderElement") sliderElement: ElementRef<HTMLInputElement>;

  private startValue: number;
  public resetIcon = faXmarkCircle;
  public progressWidth: string = "";

  ngOnInit(): void {
    this.startValue = this.config.value;
    this.updateProgress();
  }

  private updateProgress() {
    const min = this.config.minValue;
    const max = this.config.maxValue;
    const val = this.config.value;

    const progressPercent = ((val - min) / (max - min));
    const handleOffset = 12;
    this.progressWidth = `calc((${this.config.width}px - ${handleOffset}px) * ${progressPercent})`;
  }

  public onInput(e: Event): void {
    this.config.value = clamp(
      parseFloat(this.sliderElement.nativeElement.value || "0"),
      this.config.minValue,
      this.config.maxValue
    );
    this.updateProgress();

    this.onValueChange.emit(this.config);
  }

  public onResetSlider(): void {
    this.config.value = this.startValue;
    //fixes slider value not changing in html element
    if (this.sliderElement?.nativeElement) {
      this.sliderElement.nativeElement.value = this.config.value.toString();
    }
    this.onValueChange.emit(this.config);
    this.updateProgress();
  }

  public getSliderValue(): number {
    return this.config.value;
  }

  public get width(): string {
    return `${this.config.width}px`;
  }

}
