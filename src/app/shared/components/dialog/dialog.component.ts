import { AfterViewInit, Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, ViewChild } from '@angular/core';
import { UiFactoryService } from '../../services/ui-factory.service';
import { Button } from '../button/classes/button.class';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { IconPosition } from '../button/enum/button.enum';
import { ButtonComponent } from "../button/button.component";
import { DialogSize } from './enum/dialog-size.enum';

@Component({
  selector: 'app-dialog',
  imports: [ButtonComponent],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss'
})
export class DialogComponent implements OnInit, AfterViewInit {

  @ViewChild("dialog") dialogRef: ElementRef<HTMLDialogElement>;
  @Input() open: boolean = false;
  @Input() label: string = "";
  @Input() size: DialogSize;

  @Output() onClosed: EventEmitter<void> = new EventEmitter<void>();

  public closeButton: Button = null;

  @HostListener('document:click', ['$event'])
  onClickOutside(event: any) {
    const rect = this.dialogRef.nativeElement.getBoundingClientRect();
    const isInDialog = (rect.top <= event.clientY && event.clientY <= rect.top + rect.height &&
      rect.left <= event.clientX && event.clientX <= rect.left + rect.width);

    if (!isInDialog && this.open) {
      this.onCloseBtn();
    }
  }

  constructor(private uiFactory: UiFactoryService) { }

  ngOnInit(): void {
    this.closeButton = this.uiFactory.buildButton(
      null,
      "btn-danger",
      faXmark,
      IconPosition.LEFT
    )
  }

  ngAfterViewInit(): void {
    this.tryOpenModal();
  }

  ngOnChanges() {
    this.tryOpenModal();
  }

  public tryOpenModal(): void {
    if (this.open) {
      this.openModal();
    } else {
      this.closeModal();
    }
  }

  public onCloseBtn(): void {
    this.closeModal();
    this.onClosed.emit();
  }

  private openModal(): void {
    this.dialogRef?.nativeElement?.showModal();
  }

  private closeModal(): void {
    this.dialogRef?.nativeElement?.close();
  }

}
