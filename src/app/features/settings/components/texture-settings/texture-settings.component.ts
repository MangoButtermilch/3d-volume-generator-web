import { Component, OnInit } from '@angular/core';
import { Checkbox } from '../../../../shared/components/checkbox/classes/checkbox.class';
import { Slider } from '../../../../shared/components/slider/classes/slider.class';
import { UiFactoryService } from '../../../../shared/services/ui-factory.service';
import { SliderComponent } from '../../../../shared/components/slider/slider.component';
import { CustomInput } from '../../../../shared/components/input/classes/customInput.class';
import { InputComponent } from "../../../../shared/components/input/input.component";
import { getMaxTextureSize } from '../../../../shared/utils/webgl.utils';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Observable } from 'rxjs';
import { IVector2, ShaderConfig } from '../../../../shared/interfaces/shader-configs.interfaces';
import { CanvasService } from '../../../../shared/services/canvas.service';

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
    factory.instance.buildSlider("Twirl", "cellTwirlStrength", 0, -10, 10),
    factory.instance.buildSlider("Radial shear", "cellRadialShearStrength", 0, -10, 10),
    factory.instance.buildSlider("Spherize", "cellSpherizeStrength", 0, -10, 10),
  ];

  public inputTextureSizeX: CustomInput =
    factory.instance.buildInput("x:", "textureSizeX", 4096,
      { min: 32, max: getMaxTextureSize() });

  public inputTextureSizeY: CustomInput =
    factory.instance.buildInput("y:", "textureSizeY", 4096,
      { min: 32, max: getMaxTextureSize() });

  private shaderUvConfig$: Observable<ShaderConfig> = this.canvasService.getShaderConfig()
    .pipe(takeUntilDestroyed());

  private outputResolution: IVector2 = this.canvasService.getOutputResolution();

  constructor(
    private canvasService: CanvasService
  ) { }

  ngOnInit(): void {
    this.maxTextureSize = getMaxTextureSize();
    this.handleUvConfigChanges();
  }

  public updateOutputResolutionX(value: string | number): void {
    if (typeof value == "string") {
      value = parseInt(value);
    }
    this.outputResolution.x = value;
    this.canvasService.updateOutputResolution(
      { x: value, y: this.outputResolution.y }
    );
  }

  public updateOutputResolutionY(value: string | number): void {
    if (typeof value == "string") {
      value = parseInt(value);
    }
    this.outputResolution.y = value;
    this.canvasService.updateOutputResolution(
      { x: this.outputResolution.x, y: value }
    );
  }

  private handleUvConfigChanges(): void {
    this.shaderUvConfig$.subscribe((config: ShaderConfig) => {
      for (const [name, value] of Object.entries(config)) {
        const slider = this.getSliderByUniformName(name);
        if (slider) {
          slider.value = value;
        }
      }
    });
  }

  public onSliderChange(slider: Slider): void {
    this.canvasService.updateShaderUniform(slider.uniformName, slider.value);
  }

  private getSliderByUniformName(name: string): Slider | null {
    return this.sliders.find((other) => other.uniformName === name);
  }

}
