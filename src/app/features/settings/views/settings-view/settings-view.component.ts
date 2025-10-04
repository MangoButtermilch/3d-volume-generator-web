import { Component } from '@angular/core';
import { MainSettingsComponent } from "../../components/main-settings/main-settings.component";
import { TextureSettingsComponent } from "../../components/texture-settings/texture-settings.component";
import { NoiseSettingsComponent } from "../../components/noise-settings/noise-settings.component";
import { CanvasComponent } from "../../../canvas/canvas.component";

@Component({
  selector: 'app-settings-view',
  imports: [MainSettingsComponent, TextureSettingsComponent, NoiseSettingsComponent, CanvasComponent],
  templateUrl: './settings-view.component.html',
  styleUrl: './settings-view.component.scss'
})
export class SettingsViewComponent {

}
