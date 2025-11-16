import { AfterViewInit, Component, ElementRef, Input, OnDestroy, ViewChild } from '@angular/core';
import { CanvasService } from '../../shared/services/canvas.service';
import { VolumePreviewService } from '../../shared/services/volume-preview.service';

@Component({
  selector: 'app-volume-preview',
  imports: [],
  templateUrl: './volume-preview.component.html',
  styleUrl: './volume-preview.component.scss'
})
export class VolumePreviewComponent implements OnDestroy {

  @ViewChild('previewElement') previewElement: ElementRef<HTMLCanvasElement>;
  @Input() open: boolean = false;

  constructor(private previewService: VolumePreviewService) { }

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
}