import { Component, OnInit } from '@angular/core';
import { CheckboxComponent } from "../../../../shared/components/checkbox/checkbox.component";
import { Checkbox } from '../../../../shared/components/checkbox/classes/checkbox.class';
import { Slider } from '../../../../shared/components/slider/classes/slider.class';
import { SliderComponent } from '../../../../shared/components/slider/slider.component';
import { UiFactoryService } from '../../../../shared/services/ui-factory.service';
import { CanvasService } from '../../../../shared/services/canvas.service';
import { Observable } from 'rxjs';
import { ShaderConfig } from '../../../../shared/interfaces/shader-configs.interfaces';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

const factory = UiFactoryService;

@Component({
  selector: 'app-main-settings',
  imports: [SliderComponent, CheckboxComponent],
  templateUrl: './main-settings.component.html',
  styleUrl: './main-settings.component.scss'
})
export class MainSettingsComponent implements OnInit {


  public sliders: Slider[] = [
    factory.instance.buildSlider("Depth (z position offset", "depth", 0, -100, 100),
    factory.instance.buildSlider("Center radius", "centerRadius"),
    factory.instance.buildSlider("Center strength", "centerStrength"),
    factory.instance.buildSlider("Border strength", "borderStrength"),
    factory.instance.buildSlider("Total brightness", "totalBrightness"),
    factory.instance.buildSlider("Amount of cells", "numCells", 1, 1, 32, 1),
  ];

  public checkboxes: Checkbox[] = [
    factory.instance.buildCheckbox("Hide first cell", "hideFirstCell"),
    factory.instance.buildCheckbox("Hide last cell", "hideLastCell"),
    factory.instance.buildCheckbox("Grow and shrink cells", "growAndShrinkCells")
  ];

  private shaderUvConfig$: Observable<ShaderConfig> = this.canvasService.getShaderConfig()
    .pipe(takeUntilDestroyed());

  constructor(
    private canvasService: CanvasService
  ) { }

  ngOnInit(): void {
    this.handleUvConfigChanges();
  }

  private handleUvConfigChanges(): void {
    this.shaderUvConfig$.subscribe((config: ShaderConfig) => {
      for (const [name, value] of Object.entries(config)) {

        const slider = this.getSliderByUniformName(name);
        const checkbox = this.getCheckboxByUniformName(name);

        if (slider) {
          slider.value = value;
        } else if (checkbox) {
          checkbox.value = value;
        }
      }
    });
  }

  public onSliderChange(slider: Slider): void {
    this.canvasService.updateShaderUniform(slider.uniformName, slider.value);
  }

  public onCheckboxChange(checkbox: Checkbox): void {
    this.canvasService.updateShaderUniform(checkbox.uniformName, checkbox.value);
  }

  private getSliderByUniformName(name: string): Slider | null {
    return this.sliders.find((other) => other.uniformName === name);
  }

  private getCheckboxByUniformName(name: string): Checkbox | null {
    return this.checkboxes.find((other) => other.uniformName === name);
  }
}
