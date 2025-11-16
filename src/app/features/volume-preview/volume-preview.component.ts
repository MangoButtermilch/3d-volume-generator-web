import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CanvasService } from '../../shared/services/canvas.service';
import { VolumePreviewService } from '../../shared/services/volume-preview.service';
import { UiFactoryService } from '../../shared/services/ui-factory.service';
import { Button } from '../../shared/components/button/classes/button.class';
import { faRotateLeft } from '@fortawesome/free-solid-svg-icons';
import { IconPosition } from '../../shared/components/button/enum/button.enum';
import { ButtonComponent } from "../../shared/components/button/button.component";

@Component({
  selector: 'app-volume-preview',
  imports: [ButtonComponent],
  templateUrl: './volume-preview.component.html',
  styleUrl: './volume-preview.component.scss'
})
export class VolumePreviewComponent implements OnInit, OnDestroy {

  @ViewChild('previewElement') previewElement: ElementRef<HTMLCanvasElement>;
  @Input() open: boolean = false;

  public resetCameraBtn: Button = null;

  constructor(
    private uiFactory: UiFactoryService,
    private previewService: VolumePreviewService) { }

  ngOnInit(): void {
    this.resetCameraBtn = this.uiFactory.buildButton(
      "Reset camera",
      "btn-info",
      faRotateLeft,
      IconPosition.LEFT
    );
  }

  ngOnChanges(): void {
    if (!this.previewElement?.nativeElement) return;

    if (this.open) {
      this.previewService.startInit(this.previewElement.nativeElement);
      this.previewService.startRendering();
    } else {
      this.previewService.pauseRendering();
    }
  }

  ngOnDestroy(): void {
    this.previewService.onDestroy();
  }

  public onResetCamera(): void {
    this.previewService.resetCamera();
  }
}