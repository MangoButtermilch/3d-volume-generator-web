import { Component } from '@angular/core';
import { MainSettingsComponent } from "../../components/main-settings/main-settings.component";
import { TextureSettingsComponent } from "../../components/texture-settings/texture-settings.component";
import { NoiseSettingsComponent } from "../../components/noise-settings/noise-settings.component";
import { CanvasComponent } from "../../../canvas/canvas.component";
import { ButtonComponent } from "../../../../shared/components/button/button.component";
import { Button } from '../../../../shared/components/button/classes/button.class';
import { UiFactoryService } from '../../../../shared/services/ui-factory.service';
import { faFileExport, faSave } from '@fortawesome/free-solid-svg-icons';
import { IconPosition } from '../../../../shared/components/button/enum/button.enum';
import { CanvasService } from '../../../../shared/services/canvas.service';

@Component({
  selector: 'app-settings-view',
  imports: [MainSettingsComponent, TextureSettingsComponent, NoiseSettingsComponent, CanvasComponent, ButtonComponent],
  templateUrl: './settings-view.component.html',
  styleUrl: './settings-view.component.scss'
})
export class SettingsViewComponent {

  public exportBtn: Button = UiFactoryService.instance.buildButton(
    "Save PNG",
    "btn-success",
    faSave,
    IconPosition.LEFT
  );

  constructor(private canvasService: CanvasService) { }

  public onExport(): void {
    this.canvasService.exportAsPng();
  }
}
