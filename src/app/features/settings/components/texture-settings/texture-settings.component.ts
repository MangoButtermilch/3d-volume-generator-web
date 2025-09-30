import { Component, OnInit } from '@angular/core';
import { Checkbox } from '../../../../shared/components/checkbox/classes/checkbox.class';
import { Slider } from '../../../../shared/components/slider/classes/slider.class';
import { UiFactoryService } from '../../../../shared/services/ui-factory.service';
import { SliderComponent } from '../../../../shared/components/slider/slider.component';
import { CustomInput } from '../../../../shared/components/input/classes/customInput.class';
import { InputComponent } from "../../../../shared/components/input/input.component";
import { getMaxTextureSize } from '../../../../shared/utils/webgl.utils';

const factory = UiFactoryService;
@Component({
  selector: 'app-texture-settings',
  imports: [SliderComponent, InputComponent],
  templateUrl: './texture-settings.component.html',
  styleUrl: './texture-settings.component.scss'
})
export class TextureSettingsComponent implements OnInit {

  public maxTextureSize: number = 0;

  public sliders: Slider[] = [
    factory.instance.buildSlider("Twirl", "twirl", 0, -1, 1),
    factory.instance.buildSlider("Radial shear", "radialShear", 0, -1, 1),
    factory.instance.buildSlider("Spherize", "spherize", 0, -1, 1),
  ];

  public inputTextureSizeX: CustomInput =
    factory.instance.buildInput("x:", "textureSizeX", 4096,
      { min: 32, max: getMaxTextureSize() });

  public inputTextureSizeY: CustomInput =
    factory.instance.buildInput("y:", "textureSizeY", 4096,
      { min: 32, max: getMaxTextureSize() });

  ngOnInit(): void {
    this.maxTextureSize = getMaxTextureSize();
  }

}
