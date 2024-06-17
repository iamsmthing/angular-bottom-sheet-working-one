import { Component, ElementRef, HostListener, Inject } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-bottom-sheet-content',
  templateUrl: './bottom-sheet-content.component.html',
  styleUrls: ['./bottom-sheet-content.component.scss'],
})
export class BottomSheetContentComponent {
  private startY: number = 0;
  private currentY: number = 0;
  private isDragging: boolean = false;

  constructor(
    private bottomSheetRef: MatBottomSheetRef<BottomSheetContentComponent>,
    private elementRef: ElementRef
  ) {}

  startDrag(event: MouseEvent): void {
    this.isDragging = true;
    this.startY = event.clientY;
    document.addEventListener('mousemove', this.onDrag);
    document.addEventListener('mouseup', this.stopDrag);
  }

  onDrag = (event: MouseEvent): void => {
    if (!this.isDragging) return;

    this.currentY = event.clientY;
    const deltaY = this.currentY - this.startY;

    // Update the position of the bottom sheet (optional, for visual feedback)
    const container = this.elementRef.nativeElement.querySelector(
      '.bottom-sheet-container'
    );
    container.style.transform = `translateY(${deltaY}px)`;

    // If dragged down enough, close the bottom sheet
    if (deltaY > 100) {
      // 100 pixels threshold to close
      this.bottomSheetRef.dismiss();
      console.log(deltaY);
      this.stopDrag(); // Clean up event listeners
    }
  };

  stopDrag = (): void => {
    if (!this.isDragging) return;

    this.isDragging = false;
    document.removeEventListener('mousemove', this.onDrag);
    document.removeEventListener('mouseup', this.stopDrag);

    // Reset the position of the bottom sheet (optional, for visual feedback)
    const container = this.elementRef.nativeElement.querySelector(
      '.bottom-sheet-container'
    );
    container.style.transform = `translateY(0)`;
  };
}
