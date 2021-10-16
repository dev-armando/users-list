import { Component, Input, OnInit } from '@angular/core';

enum POSITION_VERTICAL {
  BOTTOM = 'bottom',
  CENTER = 'center',
  TOP = 'top',
}

enum POSITION_HORIZONTAL {
  LEFT = 'left',
  CENTER = 'center',
  RIGHT = 'right',
}

@Component({
  selector: 'app-button-float',
  template: `
    <button mat-fab aria-label="btn-float" [class]="[vertical, horizontal]">
      <i [class]="icon"></i>
    </button>
  `,
  styles: [
    '.mat-fab{position:fixed; margin:1.5rem; background-color:#437DFF}',
    '.top{top:0;}',
    '.bottom{bottom:0;}',
    '.center{center:0;}',
    '.left{left:0;}',
    '.right{right:0;}',
  ],
})
export class ButtonFloatComponent implements OnInit {
  @Input() icon: string;
  @Input() vertical: POSITION_VERTICAL = POSITION_VERTICAL.BOTTOM;
  @Input() horizontal: POSITION_HORIZONTAL = POSITION_HORIZONTAL.RIGHT;
  constructor() {}

  ngOnInit(): void {}
}
