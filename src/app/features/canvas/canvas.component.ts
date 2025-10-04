import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { CanvasService } from '../../shared/services/canvas.service';

@Component({
  selector: 'app-canvas',
  imports: [],
  templateUrl: './canvas.component.html',
  styleUrl: './canvas.component.scss'
})
export class CanvasComponent implements AfterViewInit {

  @ViewChild('canvasElement') canvasElement: ElementRef<HTMLCanvasElement>;

  constructor(private canvasService: CanvasService) { }

  ngAfterViewInit(): void {
    this.canvasService.setup(this.canvasElement.nativeElement);
  }


}
