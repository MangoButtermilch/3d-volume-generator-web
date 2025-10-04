import { Component, OnInit } from '@angular/core';
import { MainSettingsComponent } from "../../components/main-settings/main-settings.component";
import { TextureSettingsComponent } from "../../components/texture-settings/texture-settings.component";
import { NoiseSettingsComponent } from "../../components/noise-settings/noise-settings.component";
import { CanvasComponent } from "../../../canvas/canvas.component";
import { ButtonComponent } from "../../../../shared/components/button/button.component";
import { Button } from '../../../../shared/components/button/classes/button.class';
import { UiFactoryService } from '../../../../shared/services/ui-factory.service';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import { IconPosition } from '../../../../shared/components/button/enum/button.enum';
import { CanvasService } from '../../../../shared/services/canvas.service';
import { Observable } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-settings-view',
  imports: [
    CommonModule,
    MainSettingsComponent,
    TextureSettingsComponent,
    NoiseSettingsComponent,
    CanvasComponent,
    ButtonComponent
  ],
  templateUrl: './settings-view.component.html',
  styleUrl: './settings-view.component.scss'
})
export class SettingsViewComponent implements OnInit {

  public exportBtn: Button;

  public canvasLoading$: Observable<boolean> = this.canvasService.getCanvasLoading()
    .pipe(takeUntilDestroyed());

  constructor(
    private uiFactory: UiFactoryService,
    private canvasService: CanvasService) { }

  ngOnInit(): void {
    this.exportBtn = this.uiFactory.buildButton(
      "Save PNG",
      "btn-success",
      faSave,
      IconPosition.LEFT
    );
  }
  public onExport(): void {
    this.canvasService.exportAsPng();
  }
}
