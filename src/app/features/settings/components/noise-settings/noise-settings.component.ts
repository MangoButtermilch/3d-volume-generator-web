import { Component } from '@angular/core';
import { NoiseLayerComponent } from "./components/noise-layer/noise-layer.component";
import { NoiseLayer } from './classes/noise-layer.class';
import { GuidService } from '../../../../core/services/guid.service';
import { NoiseType } from './enum/noise-type.enum';
import { faAdd } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { UiFactoryService } from '../../../../shared/services/ui-factory.service';
import { IconPosition } from '../../../../shared/components/button/enum/button.enum';

@Component({
  selector: 'app-noise-settings',
  imports: [NoiseLayerComponent, FontAwesomeModule],
  templateUrl: './noise-settings.component.html',
  styleUrl: './noise-settings.component.scss'
})
export class NoiseSettingsComponent {

  public addButton = UiFactoryService.instance.buildButton(
    "Add",
    "btn-success",
    faAdd,
    IconPosition.RIGHT
  )

  public noiseLayers: NoiseLayer[] = [
    new NoiseLayer(
      GuidService.new,
      "Noise layer 1",
      1.9,
      2.,
      2.,
      NoiseType.PERLIN,
      false,
      true,
      3.1
    ),
    new NoiseLayer(
      GuidService.new,
      "Noise layer 2",
      1.9,
      2.,
      2.,
      NoiseType.SIMPLEX,
      false,
      true,
      3.1
    ),
    new NoiseLayer(
      GuidService.new,
      "Noise layer 3",
      1.9,
      2.,
      2.,
      NoiseType.VORONOI,
      false,
      true,
      3.1
    ),
    new NoiseLayer(
      GuidService.new,
      "Noise layer 4",
      1.9,
      2.,
      2.,
      NoiseType.NEBULA,
      false,
      true,
      3.1
    )
  ];
}
