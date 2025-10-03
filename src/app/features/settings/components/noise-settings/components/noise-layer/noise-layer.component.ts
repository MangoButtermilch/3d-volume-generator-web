import { Component, Input, OnInit } from '@angular/core';
import { NoiseLayer } from '../../classes/noise-layer.class';
import { UiFactoryService } from '../../../../../../shared/services/ui-factory.service';
import { Slider } from '../../../../../../shared/components/slider/classes/slider.class';
import { Checkbox } from '../../../../../../shared/components/checkbox/classes/checkbox.class';
import { Dropdown } from '../../../../../../shared/components/dropdown/classes/dropdown.class';
import { SliderComponent } from "../../../../../../shared/components/slider/slider.component";
import { DropdownComponent } from "../../../../../../shared/components/dropdown/dropdown.component";
import { CheckboxComponent } from "../../../../../../shared/components/checkbox/checkbox.component";
import { NoiseType } from '../../enum/noise-type.enum';

@Component({
  selector: 'app-noise-layer',
  imports: [SliderComponent, DropdownComponent, CheckboxComponent],
  templateUrl: './noise-layer.component.html',
  styleUrl: './noise-layer.component.scss'
})
export class NoiseLayerComponent implements OnInit {

  @Input() config: NoiseLayer;

  public scaleSlider: Slider;
  public powerSlider: Slider;
  public distortionSlider: Slider;
  public angleOffsetSlider: Slider;

  public invertCheckbox: Checkbox;
  public enabledCheckbox: Checkbox;

  public noiseTypeDropdown: Dropdown;

  constructor(
    private uiFactory: UiFactoryService
  ) { }

  ngOnInit(): void {

    this.scaleSlider = this.uiFactory.buildSlider("Scale", "scale", this.config.scale);
    this.powerSlider = this.uiFactory.buildSlider("Power", "power", this.config.scale);
    this.distortionSlider = this.uiFactory.buildSlider("Distortion", "distortion", this.config.scale);
    this.angleOffsetSlider = this.uiFactory.buildSlider("Angle offset", "angle offset", this.config.scale);

    this.noiseTypeDropdown = this.uiFactory.buildDropdown(
      "Noise type",
      "noiseType",
      NoiseType.PERLIN,
      [
        { label: "Perlin noise", value: NoiseType.PERLIN },
        { label: "Simplex noise", value: NoiseType.SIMPLEX },
        { label: "Voronoi noise", value: NoiseType.VORONOI },
        { label: "Nebula noise", value: NoiseType.NEBULA },
      ]
    );

    this.invertCheckbox = this.uiFactory.buildCheckbox("Inverted", "inverted");
    this.enabledCheckbox = this.uiFactory.buildCheckbox("Enabled", "enabled", true);
  }

}
