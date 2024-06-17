import { Component, HostListener } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('slideAnimation', [
      state(
        'open',
        style({
          transform: 'translateY(0%)',
        })
      ),
      state(
        'closed',
        style({
          transform: 'translateY(100%)',
        })
      ),
      transition('open => closed', [animate('0.3s ease-out')]),
      // Include transition back from closed to open if needed
      // transition('closed => open', [
      //   animate('0.3s ease-out')
      // ])
    ]),
  ],
})
export class AppComponent {
  animationState: 'open' | 'closed' = 'open'; // Initial state of the bottom sheet

  // Variables for drag handling
  private startY: number = 0;
  private isDragging: boolean = false;
  private canClose: boolean = true; // Flag to control triggering of close action

  @HostListener('window:mouseup', ['$event'])
  onMouseUp(event: MouseEvent) {
    this.stopDrag();
  }

  @HostListener('window:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    this.doDrag(event);
  }

  startDrag(event: MouseEvent) {
    // Only allow dragging if the bottom sheet is open and can be closed
    if (this.animationState === 'open' && this.canClose) {
      this.isDragging = true;
      this.startY = event.clientY;
    }
  }

  doDrag(event: MouseEvent) {
    // Only process drag if currently dragging and the sheet is open
    if (!this.isDragging || this.animationState !== 'open') return;

    const deltaY = event.clientY - this.startY;

    // If dragged down more than a threshold and the close action is allowed
    if (deltaY > 50 && this.canClose) {
      this.animationState = 'closed'; // Close the bottom sheet
      this.isDragging = false; // Stop dragging
      console.log(deltaY);
      this.canClose = false; // Prevent further close actions
    }
  }

  stopDrag() {
    if (!this.isDragging) return;

    // Stop dragging but ensure no additional action is taken
    this.isDragging = false;

    // Optionally: reset canClose to true if drag didn't close the sheet
    if (this.animationState !== 'closed') {
      this.canClose = true;
    }
  }

  // Method to open the bottom sheet and reset states if needed
  openBottomSheet() {
    this.animationState = 'open';
    this.canClose = true;
  }
}
