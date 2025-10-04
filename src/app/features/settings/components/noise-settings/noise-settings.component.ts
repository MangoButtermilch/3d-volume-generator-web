import { Component } from '@angular/core';
import { NoiseLayerComponent } from "./components/noise-layer/noise-layer.component";
import { GuidService } from '../../../../core/services/guid.service';
import { faAdd } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { UiFactoryService } from '../../../../shared/services/ui-factory.service';
import { IconPosition } from '../../../../shared/components/button/enum/button.enum';
import { defaultNoiseLayerConfig, NoiseLayer, NoiseType } from '../../../../shared/interfaces/shader-configs.interfaces';

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

  public noiseLayers = defaultNoiseLayerConfig;
}
