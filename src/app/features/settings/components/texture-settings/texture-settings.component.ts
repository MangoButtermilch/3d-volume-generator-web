import { Component } from '@angular/core';
import { Checkbox } from '../../../../shared/components/checkbox/classes/checkbox.class';
import { Slider } from '../../../../shared/components/slider/classes/slider.class';
import { UiFactoryService } from '../../../../shared/services/ui-factory.service';
import { SliderComponent } from '../../../../shared/components/slider/slider.component';

const factory = UiFactoryService;
@Component({
  selector: 'app-texture-settings',
  imports: [SliderComponent],
  templateUrl: './texture-settings.component.html',
  styleUrl: './texture-settings.component.scss'
})
export class TextureSettingsComponent {

  public sliders: Slider[] = [
    factory.instance.buildSlider("Twirl", "twirl", 0, -1, 1),
    factory.instance.buildSlider("Radial shear", "radialShear", 0, -1, 1),
    factory.instance.buildSlider("Spherize", "spherize", 0, -1, 1),
  ];


}
