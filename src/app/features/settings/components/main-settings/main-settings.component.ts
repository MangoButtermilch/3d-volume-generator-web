import { Component } from '@angular/core';
import { CheckboxComponent } from "../../../../shared/components/checkbox/checkbox.component";
import { Checkbox } from '../../../../shared/components/checkbox/classes/checkbox.class';
import { Slider } from '../../../../shared/components/slider/classes/slider.class';
import { SliderComponent } from '../../../../shared/components/slider/slider.component';
import { UiFactoryService } from '../../../../shared/services/ui-factory.service';
import { CanvasService } from '../../../services/canvas.service';

const factory = UiFactoryService;

@Component({
  selector: 'app-main-settings',
  imports: [SliderComponent, CheckboxComponent],
  templateUrl: './main-settings.component.html',
  styleUrl: './main-settings.component.scss'
})
export class MainSettingsComponent {


  public sliders: Slider[] = [
    factory.instance.buildSlider("Depth (z position offset", "depth"),
    factory.instance.buildSlider("Center radius", "centerRadius"),
    factory.instance.buildSlider("Center strength", "centerStrength"),
    factory.instance.buildSlider("Border strength", "borderStrength"),
    factory.instance.buildSlider("Total brightness", "totalBrightness"),
    factory.instance.buildSlider("Amount of cells", "amountOfCells"),
  ];

  public checkboxes: Checkbox[] = [
    factory.instance.buildCheckbox("Hide first cell", "hideFirstCell"),
    factory.instance.buildCheckbox("Hide last cell", "hideLastCell"),
    factory.instance.buildCheckbox("Grow and shrink cells", "growAndShrinkCells")
  ];

  constructor(
    private canvasService: CanvasService
  ) { }

  public onSliderChange(slider: Slider): void {
    this.canvasService.updateShaderUvUniform(slider.uniformName, slider.value);
  }

}
