import { Component } from '@angular/core';
import { UiFactoryService } from '../../../../shared/services/ui-factory.service';
import { Slider } from '../../../../shared/components/slider/classes/slider.class';
import { Checkbox } from '../../../../shared/components/checkbox/classes/checkbox.class';
import { SliderComponent } from '../../../../shared/components/slider/slider.component';
import { CheckboxComponent } from "../../../../shared/components/checkbox/checkbox.component";

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
    factory.instance.buildSlider("Center power", "centerPower"),
    factory.instance.buildSlider("Border power", "borderPower"),
    factory.instance.buildSlider("Total brightness", "totalBrightness"),
    factory.instance.buildSlider("Amount of cells", "amountOfCells"),
  ];

  public checkboxes: Checkbox[] = [
    factory.instance.buildCheckbox("Hide first cell", "hideFirstCell"),
    factory.instance.buildCheckbox("Hide last cell", "hideLastCell"),
    factory.instance.buildCheckbox("Grow and shrink cells", "growAndShrinkCells")
  ];
}
